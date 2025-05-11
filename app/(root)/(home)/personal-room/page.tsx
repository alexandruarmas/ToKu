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
import { Creepster } from "next/font/google";

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

const creepster = Creepster({ subsets: ["latin"], weight: "400", variable: "--font-creepster" });

const Table = ({ 
  title, 
  description, 
  onEdit, 
  isEditing, 
  onSave, 
  editValue, 
  onEditChange 
}: TableProps) => (
  <div className="grid grid-cols-[120px,1fr,auto] items-center gap-4">
    <h1 className="text-sky-1 text-base font-medium">{title}:</h1>
    {isEditing ? (
      <div className="flex gap-2">
        <Input
          value={editValue}
          onChange={(e) => onEditChange?.(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
        />
        <Button 
          onClick={() => onSave?.(editValue || '')}
          className="bg-green-500 hover:bg-green-600 text-white px-4"
        >
          Save
        </Button>
      </div>
    ) : (
      <>
        <p className="text-white text-base font-medium truncate">{description}</p>
        {onEdit && (
          <Button
            onClick={onEdit}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <Pencil size={16} />
          </Button>
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
    // Meeting Preferences
    defaultMuteAudio: false,
    defaultMuteVideo: false,
    allowChat: true,
    allowRaiseHand: true,
    defaultLayout: "speaker-left",
    autoRecording: false,
    
    // Notification Settings
    notifyOnJoin: true,
    notifyOnLeave: false,
    notifyOnChat: true,
    notifyOnRaiseHand: true,
    
    // Access Controls
    requireApproval: false,
    allowScreenShare: true,
    maxParticipants: "10",
    waitingRoom: false
  });

  const updateSetting = (key: keyof typeof roomSettings, value: string | boolean | number) => {
    setRoomSettings(prev => ({ ...prev, [key]: value }));
    toast({ 
      title: "Setting updated",
      description: "Your preference has been saved"
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
        console.error("Failed to fetch room stats:", error);
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
        title: "Unable to start the meeting",
        description: "Please try again later",
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
      console.error("Failed to start room:", error);
      toast({
        title: "Failed to start the meeting",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleEditTopic = () => {
    setTopicValue(`${displayName}'s Meeting Room`);
    setIsEditingTopic(true);
  };

  const handleSaveTopic = (value: string) => {
    if (value.trim()) {
      setIsEditingTopic(false);
      toast({ title: "Topic updated" });
    } else {
      toast({ 
        title: "Invalid topic",
        description: "Topic cannot be empty",
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
        <h1>Unable to load Personal Room</h1>
        <p>{error.message || "An unknown error occurred"}</p>
        <Button onClick={() => router.refresh()}>Try Again</Button>
      </div>
    );
  }

  return (
    <PageLayout
      title={<span className={`flex justify-center w-full ${creepster.className}`}>Personal Room</span>}
      subtitle={<span className="flex justify-center w-full font-subtitle">Your personal meeting room</span>}
      statusText="Your Personal Meeting Room"
      iconColor="bg-purple-400"
      bgGradient="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {isCallLoading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : (
        <div className="space-y-6">
          {/* View Mode Selector */}
          <Tabs value={viewMode} onValueChange={handleViewModeChange} className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Room Info
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === "info" ? (
            <>
              {/* Room Information */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
                <div className="space-y-6 max-w-2xl">
                  <Table 
                    title="Topic" 
                    description={`${displayName}'s Meeting Room`}
                    onEdit={handleEditTopic}
                    isEditing={isEditingTopic}
                    onSave={handleSaveTopic}
                    editValue={topicValue}
                    onEditChange={setTopicValue}
                  />
                  <div className="flex items-center gap-4">
                    <Table title="Invite link" description={meetingLink} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                          <Share2 size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-dark-2 border-dark-1">
                        <DropdownMenuItem onClick={() => {
                          navigator.clipboard.writeText(meetingLink);
                          toast({ title: "Link copied to clipboard" });
                        }}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          const text = `Join my meeting room: ${meetingLink}`;
                          navigator.share?.({ text }).catch(() => {
                            navigator.clipboard.writeText(text);
                            toast({ title: "Link copied to clipboard" });
                          });
                        }}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-8">
                  <Button 
                    onClick={startRoom}
                    disabled={isCreatingRoom}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
                  >
                    {isCreatingRoom ? "Starting..." : "Start Meeting"}
                  </Button>
                </div>
              </div>

              {/* Room Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <Users className="h-8 w-8 mb-4 text-purple-400" />
                  <h3 className="text-lg font-medium mb-2">Total Meetings</h3>
                  <p className="text-3xl font-bold">{roomStats.totalMeetings}</p>
                </div>
                <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <Clock className="h-8 w-8 mb-4 text-emerald-400" />
                  <h3 className="text-lg font-medium mb-2">Total Duration</h3>
                  <p className="text-3xl font-bold">
                    {Math.round(roomStats.totalDuration / (1000 * 60))}m
                  </p>
                </div>
                <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <Clock className="h-8 w-8 mb-4 text-amber-400" />
                  <h3 className="text-lg font-medium mb-2">Average Duration</h3>
                  <p className="text-3xl font-bold">
                    {Math.round(roomStats.averageDuration / (1000 * 60))}m
                  </p>
                </div>
                <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-8 w-8 mb-4 text-blue-400" />
                  <h3 className="text-lg font-medium mb-2">Last Meeting</h3>
                  <p className="text-xl font-bold">
                    {roomStats.lastMeeting ? roomStats.lastMeeting.toLocaleDateString() : "Never"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Settings View */
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
              <div className="space-y-8 max-w-3xl">
                {/* Meeting Preferences */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Meeting Preferences</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mic className="h-4 w-4" />
                          <Label>Mute audio by default</Label>
                        </div>
                        <p className="text-sm text-gray-400">Participants will join with muted microphone</p>
                      </div>
                      <Switch 
                        checked={roomSettings.defaultMuteAudio}
                        onCheckedChange={(checked) => updateSetting('defaultMuteAudio', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <Label>Mute video by default</Label>
                        </div>
                        <p className="text-sm text-gray-400">Participants will join with camera off</p>
                      </div>
                      <Switch 
                        checked={roomSettings.defaultMuteVideo}
                        onCheckedChange={(checked) => updateSetting('defaultMuteVideo', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <Label>Enable chat</Label>
                        </div>
                        <p className="text-sm text-gray-400">Allow participants to use chat during meetings</p>
                      </div>
                      <Switch 
                        checked={roomSettings.allowChat}
                        onCheckedChange={(checked) => updateSetting('allowChat', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Hand className="h-4 w-4" />
                          <Label>Allow raise hand</Label>
                        </div>
                        <p className="text-sm text-gray-400">Participants can raise hand to ask questions</p>
                      </div>
                      <Switch 
                        checked={roomSettings.allowRaiseHand}
                        onCheckedChange={(checked) => updateSetting('allowRaiseHand', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Layout className="h-4 w-4" />
                          <Label>Default layout</Label>
                        </div>
                        <p className="text-sm text-gray-400">Choose the default meeting view layout</p>
                      </div>
                      <Select 
                        value={roomSettings.defaultLayout}
                        onValueChange={(value: string) => updateSetting('defaultLayout', value)}
                      >
                        <SelectTrigger className="w-[180px] bg-dark-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-2">
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="speaker-left">Speaker Left</SelectItem>
                          <SelectItem value="speaker-right">Speaker Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <Label>Auto recording</Label>
                        </div>
                        <p className="text-sm text-gray-400">Automatically start recording when meeting begins</p>
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
                  <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <Label>Participant join alerts</Label>
                        </div>
                        <p className="text-sm text-gray-400">Get notified when someone joins the meeting</p>
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
                          <Label>Participant leave alerts</Label>
                        </div>
                        <p className="text-sm text-gray-400">Get notified when someone leaves the meeting</p>
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
                          <Label>Chat notifications</Label>
                        </div>
                        <p className="text-sm text-gray-400">Get notified of new chat messages</p>
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
                          <Label>Raised hand alerts</Label>
                        </div>
                        <p className="text-sm text-gray-400">Get notified when someone raises their hand</p>
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
                  <h2 className="text-2xl font-semibold mb-6">Access Controls</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          <Label>Require approval</Label>
                        </div>
                        <p className="text-sm text-gray-400">Manually approve participants before they can join</p>
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
                          <Label>Allow screen sharing</Label>
                        </div>
                        <p className="text-sm text-gray-400">Let participants share their screens</p>
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
                          <Label>Maximum participants</Label>
                        </div>
                        <p className="text-sm text-gray-400">Set the maximum number of participants allowed</p>
                      </div>
                      <Select 
                        value={roomSettings.maxParticipants}
                        onValueChange={(value: string) => updateSetting('maxParticipants', value)}
                      >
                        <SelectTrigger className="w-[120px] bg-dark-2 flex-shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-2">
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <Label>Waiting room</Label>
                        </div>
                        <p className="text-sm text-gray-400">Place participants in a waiting room before joining</p>
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
