"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { 
  Bell, 
  Video, 
  Mic, 
  Lock, 
  Users, 
  Clock, 
  Calendar, 
  Share2, 
  Copy, 
  Settings,
  MessageSquare,
  Hand,
  Layout,
  Pencil
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Ribeye_Marrow } from "next/font/google";

import { Loader } from "@/components/loader";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/use-get-call-by-id";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useGridLayout } from "@/hooks/use-grid-layout";

type TableProps = {
  title: string;
  description: string;
  onEdit?: () => void;
  isEditing?: boolean;
  onSave?: (value: string) => void;
  editValue?: string;
  onEditChange?: (value: string) => void;
};

type ViewMode = "info" | "settings";

const ribeyeMarrow = Ribeye_Marrow({ subsets: ["latin"], weight: "400", variable: "--font-ribeye-marrow" });

const Table = ({ 
  title, 
  description, 
  onEdit, 
  isEditing, 
  onSave, 
  editValue, 
  onEditChange 
}: TableProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-[120px,1fr,auto] gap-2 sm:gap-4 items-center">
    <h1 className="text-sky-1 text-base font-medium">{title}:</h1>
    {isEditing ? (
      <div className="col-span-full sm:col-span-1 flex gap-2">
        <Input
          value={editValue}
          onChange={(e) => onEditChange?.(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
        />
        <Button 
          onClick={() => onSave?.(editValue || '')}
          className="bg-green-500 hover:bg-green-600 text-white px-4"
        >
          Salvează
        </Button>
      </div>
    ) : (
      <>
        <p className="text-white text-base font-medium truncate break-all sm:break-normal">{description}</p>
        {onEdit && (
          <div className="justify-self-end">
            <Button
              onClick={onEdit}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <Pencil size={16} />
            </Button>
          </div>
        )}
      </>
    )}
  </div>
);

const PersonalRoomPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoaded: isUserLoaded } = useUser();
  const streamClient = useStreamVideoClient();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [topicValue, setTopicValue] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("info");
  const [roomStats, setRoomStats] = useState({
    totalMeetings: 0,
    totalDuration: 0,
    averageDuration: 0,
    lastMeeting: null as Date | null
  });

  const [roomSettings, setRoomSettings] = useState({
    // Preferințe Întâlnire
    defaultMuteAudio: false,
    defaultMuteVideo: false,
    allowChat: true,
    allowRaiseHand: true,
    defaultLayout: "speaker-left",
    autoRecording: false,
    
    // Setări Notificări
    notifyOnJoin: true,
    notifyOnLeave: false,
    notifyOnChat: true,
    notifyOnRaiseHand: true,
    
    // Control Acces
    requireApproval: false,
    allowScreenShare: true,
    maxParticipants: "10",
    waitingRoom: false
  });

  const { getGridLayoutClasses } = useGridLayout();

  const updateSetting = (key: keyof typeof roomSettings, value: string | boolean | number) => {
    setRoomSettings(prev => ({ ...prev, [key]: value }));
    toast({ 
      title: "Setare actualizată",
      description: "Preferința ta a fost salvată"
    });
  };

  const meetingId = user?.id;
  const { call, isCallLoading, error } = useGetCallById(meetingId);

  useEffect(() => {
    const fetchRoomStats = async () => {
      if (!streamClient || !meetingId) return;

      try {
        const { calls } = await streamClient.queryCalls({
          filter_conditions: {
            id: meetingId,
            ended_at: { $exists: true }
          }
        });

        if (calls.length > 0) {
          const totalMeetings = calls.length;
          const durations = calls.map(call => {
            const start = new Date(call.state.startsAt || 0);
            const end = new Date(call.state.endedAt || 0);
            return end.getTime() - start.getTime();
          });
          
          const totalDuration = durations.reduce((acc, dur) => acc + dur, 0);
          const averageDuration = totalDuration / totalMeetings;
          const lastMeeting = new Date(calls[0].state.startsAt || 0);

          setRoomStats({
            totalMeetings,
            totalDuration,
            averageDuration,
            lastMeeting
          });
        }
      } catch (error) {
        console.error("Eroare la încărcarea statisticilor camerei:", error);
      }
    };

    fetchRoomStats();
  }, [streamClient, meetingId]);

  if (!isUserLoaded || !user) {
    return <Loader />;
  }

  const displayName = user.username || user.fullName || user.firstName || user.id;
  const meetingLink = meetingId 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
    : "";

  const startRoom = async () => {
    if (!streamClient || !meetingId) {
      toast({
        title: "Nu se poate porni întâlnirea",
        description: "Vă rugăm încercați din nou mai târziu",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsCreatingRoom(true);

      if (!call) {
        const newCall = streamClient.call("default", meetingId);
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
            custom: {
              settings: {
                // Meeting Preferences
                defaultMuteAudio: roomSettings.defaultMuteAudio,
                defaultMuteVideo: roomSettings.defaultMuteVideo,
                allowChat: roomSettings.allowChat,
                allowRaiseHand: roomSettings.allowRaiseHand,
                defaultLayout: roomSettings.defaultLayout,
                autoRecording: roomSettings.autoRecording,
                
                // Access Controls
                requireApproval: roomSettings.requireApproval,
                allowScreenShare: roomSettings.allowScreenShare,
                maxParticipants: parseInt(roomSettings.maxParticipants),
                waitingRoom: roomSettings.waitingRoom
              }
            }
          },
        });
      }

      router.push(`/meeting/${meetingId}?personal=true`);
    } catch (error) {
      console.error("Eroare la pornirea camerei:", error);
      toast({
        title: "Eroare la pornirea întâlnirii",
        description: "Vă rugăm încercați din nou mai târziu",
        variant: "destructive"
      });
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleEditTopic = () => {
    setTopicValue(`Camera de Întâlniri a lui ${displayName}`);
    setIsEditingTopic(true);
  };

  const handleSaveTopic = (value: string) => {
    if (value.trim()) {
      setIsEditingTopic(false);
      toast({ title: "Subiect actualizat" });
    } else {
      toast({ 
        title: "Subiect invalid",
        description: "Subiectul nu poate fi gol",
        variant: "destructive"
      });
    }
  };

  const handleViewModeChange = (value: string) => {
    setViewMode(value as ViewMode);
  };

  if (error) {
    return (
      <div className="text-white text-center">
        <h1>Nu se poate încărca Camera Personală</h1>
        <p>{error.message || "A apărut o eroare necunoscută"}</p>
        <Button onClick={() => router.refresh()}>Încearcă din nou</Button>
      </div>
    );
  }

  return (
    <PageLayout
      title={<span className={`flex justify-center w-full ${ribeyeMarrow.className}`}>Cameră Personală</span>}
      subtitle={<span className="flex justify-center w-full font-subtitle">Camera ta personală de întâlniri</span>}
      statusText="Camera ta Personală de Întâlniri"
      iconColor="bg-purple-400"
      bgGradient="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {isCallLoading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : (
        <div className="space-y-6 mx-auto max-w-4xl w-full px-4 sm:px-6">
          {/* View Mode Selector */}
          <Tabs value={viewMode} onValueChange={handleViewModeChange} className="w-full flex justify-center">
            <TabsList className="w-full max-w-[400px] grid grid-cols-2">
              <TabsTrigger value="info" className="flex items-center gap-2 justify-center">
                <Users className="h-4 w-4" />
                Informații Cameră
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 justify-center">
                <Settings className="h-4 w-4" />
                Setări
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === "info" ? (
            <>
              {/* Room Information */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 md:p-8">
                <div className="space-y-6 mx-auto">
                  <Table 
                    title="Subiect" 
                    description={`Camera de Întâlniri a lui ${displayName}`}
                    onEdit={handleEditTopic}
                    isEditing={isEditingTopic}
                    onSave={handleSaveTopic}
                    editValue={topicValue}
                    onEditChange={setTopicValue}
                  />
                  <div className="flex items-center gap-4">
                    <Table title="Link invitație" description={meetingLink} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                          <Share2 size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-dark-2 border-dark-1">
                        <DropdownMenuItem onClick={() => {
                          navigator.clipboard.writeText(meetingLink);
                          toast({ title: "Link copiat în clipboard" });
                        }}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copiază Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          const text = `Alătură-te camerei mele de întâlniri: ${meetingLink}`;
                          navigator.share?.({ text }).catch(() => {
                            navigator.clipboard.writeText(text);
                            toast({ title: "Link copiat în clipboard" });
                          });
                        }}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Distribuie
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-8 flex justify-center sm:justify-start">
                  <Button 
                    onClick={startRoom}
                    disabled={isCreatingRoom}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
                  >
                    {isCreatingRoom ? "Se pornește..." : "Pornește Întâlnirea"}
                  </Button>
                </div>
              </div>

              {/* Room Statistics */}
              <div className="grid gap-4 sm:gap-6 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <Users className="h-8 w-8 mb-4 text-purple-400" />
                  <h3 className="text-lg font-medium mb-2">Total Întâlniri</h3>
                  <p className="text-3xl font-bold">{roomStats.totalMeetings}</p>
                </div>
                <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <Clock className="h-8 w-8 mb-4 text-emerald-400" />
                  <h3 className="text-lg font-medium mb-2">Durată Totală</h3>
                  <p className="text-3xl font-bold">
                    {Math.round(roomStats.totalDuration / (1000 * 60))}m
                  </p>
                </div>
                <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <Clock className="h-8 w-8 mb-4 text-amber-400" />
                  <h3 className="text-lg font-medium mb-2">Durată Medie</h3>
                  <p className="text-3xl font-bold">
                    {Math.round(roomStats.averageDuration / (1000 * 60))}m
                  </p>
                </div>
                <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-8 w-8 mb-4 text-blue-400" />
                  <h3 className="text-lg font-medium mb-2">Ultima Întâlnire</h3>
                  <p className="text-xl font-bold">
                    {roomStats.lastMeeting ? roomStats.lastMeeting.toLocaleDateString() : "Niciodată"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Settings View */
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 md:p-8">
              <div className="space-y-8 mx-auto">
                {/* Meeting Preferences */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">Preferințe Întâlnire</h2>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mic className="h-4 w-4" />
                          <Label>Dezactivează sunetul implicit</Label>
                        </div>
                        <p className="text-sm text-gray-400">Participanții se vor alătura cu microfonul dezactivat</p>
                      </div>
                      <Switch 
                        checked={roomSettings.defaultMuteAudio}
                        onCheckedChange={(checked) => updateSetting('defaultMuteAudio', checked)}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <Label>Dezactivează video implicit</Label>
                        </div>
                        <p className="text-sm text-gray-400">Participanții se vor alătura cu camera oprită</p>
                      </div>
                      <Switch 
                        checked={roomSettings.defaultMuteVideo}
                        onCheckedChange={(checked) => updateSetting('defaultMuteVideo', checked)}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <Label>Activează chat</Label>
                        </div>
                        <p className="text-sm text-gray-400">Permite participanților să folosească chat-ul în timpul întâlnirilor</p>
                      </div>
                      <Switch 
                        checked={roomSettings.allowChat}
                        onCheckedChange={(checked) => updateSetting('allowChat', checked)}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Hand className="h-4 w-4" />
                          <Label>Permite ridicarea mâinii</Label>
                        </div>
                        <p className="text-sm text-gray-400">Participanții pot ridica mâna pentru a pune întrebări</p>
                      </div>
                      <Switch 
                        checked={roomSettings.allowRaiseHand}
                        onCheckedChange={(checked) => updateSetting('allowRaiseHand', checked)}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Layout className="h-4 w-4" />
                          <Label>Aspect implicit</Label>
                        </div>
                        <p className="text-sm text-gray-400">Alege aspectul implicit al întâlnirii</p>
                      </div>
                      <Select 
                        value={roomSettings.defaultLayout}
                        onValueChange={(value: string) => updateSetting('defaultLayout', value)}
                      >
                        <SelectTrigger className="w-[180px] bg-dark-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-2">
                          <SelectItem value="grid">Grilă</SelectItem>
                          <SelectItem value="speaker-left">Vorbitor Stânga</SelectItem>
                          <SelectItem value="speaker-right">Vorbitor Dreapta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <Label>Înregistrare automată</Label>
                        </div>
                        <p className="text-sm text-gray-400">Începe înregistrarea automat când începe întâlnirea</p>
                      </div>
                      <Switch 
                        checked={roomSettings.autoRecording}
                        onCheckedChange={(checked) => updateSetting('autoRecording', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Setări Notificări</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <Label>Alerte participanți noi</Label>
                        </div>
                        <p className="text-sm text-gray-400">Primește notificări când cineva se alătură întâlnirii</p>
                      </div>
                      <Switch 
                        checked={roomSettings.notifyOnJoin}
                        onCheckedChange={(checked) => updateSetting('notifyOnJoin', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <Label>Alerte părăsire participanți</Label>
                        </div>
                        <p className="text-sm text-gray-400">Primește notificări când cineva părăsește întâlnirea</p>
                      </div>
                      <Switch 
                        checked={roomSettings.notifyOnLeave}
                        onCheckedChange={(checked) => updateSetting('notifyOnLeave', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <Label>Notificări chat</Label>
                        </div>
                        <p className="text-sm text-gray-400">Primește notificări pentru mesajele noi din chat</p>
                      </div>
                      <Switch 
                        checked={roomSettings.notifyOnChat}
                        onCheckedChange={(checked) => updateSetting('notifyOnChat', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Hand className="h-4 w-4" />
                          <Label>Alerte mână ridicată</Label>
                        </div>
                        <p className="text-sm text-gray-400">Primește notificări când cineva ridică mâna</p>
                      </div>
                      <Switch 
                        checked={roomSettings.notifyOnRaiseHand}
                        onCheckedChange={(checked) => updateSetting('notifyOnRaiseHand', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Access Controls */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Control Acces</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          <Label>Necesită aprobare</Label>
                        </div>
                        <p className="text-sm text-gray-400">Aprobă manual participanții înainte să se poată alătura</p>
                      </div>
                      <Switch 
                        checked={roomSettings.requireApproval}
                        onCheckedChange={(checked) => updateSetting('requireApproval', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          <Label>Permite partajarea ecranului</Label>
                        </div>
                        <p className="text-sm text-gray-400">Permite participanților să își partajeze ecranul</p>
                      </div>
                      <Switch 
                        checked={roomSettings.allowScreenShare}
                        onCheckedChange={(checked) => updateSetting('allowScreenShare', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1 flex-shrink">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <Label>Număr maxim de participanți</Label>
                        </div>
                        <p className="text-sm text-gray-400">Limitează numărul de participanți care se pot alătura</p>
                      </div>
                      <Select 
                        value={roomSettings.maxParticipants}
                        onValueChange={(value: string) => updateSetting('maxParticipants', value)}
                      >
                        <SelectTrigger className="w-[100px] bg-dark-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-2">
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          <Label>Sală de așteptare</Label>
                        </div>
                        <p className="text-sm text-gray-400">Participanții vor aștepta într-o sală de așteptare până sunt admiși</p>
                      </div>
                      <Switch 
                        checked={roomSettings.waitingRoom}
                        onCheckedChange={(checked) => updateSetting('waitingRoom', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default PersonalRoomPage;
