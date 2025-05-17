import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRight, Video, Monitor, MessageSquare, Lock, Users, VideoIcon } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-lg border-b border-sky-500/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <Image
              src="/images/favicon.ico"
              alt="ToKu Logo"
              width={32}
              height={32}
              className="rounded-sm"
              priority
            />
            <span className="font-black-ops text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
              ToKu
            </span>
          </div>
          <div className="space-x-2">
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-white hover:text-sky-400 hover:bg-black/60">
                Conectare
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400/10">
                Înregistrare
              </Button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="h-full w-full overflow-auto">
        {/* Hero Section */}
        <main className="min-h-screen flex flex-col justify-between">
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black-ops leading-tight animate-fade-in">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
                  Conectează, Colaborează, Creează
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 mt-4">
                  cu ToKu
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-space-grotesk tracking-wide">
                Experimentează următoarea generație de videoconferințe. Claritate cristalină, securizat și conceput pentru spațiul de lucru modern.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <SignUpButton mode="modal">
                  <Button className="w-full sm:w-auto text-lg px-8 py-6 bg-black hover:bg-black/80 text-white border border-sky-500/20 hover:border-purple-500/20 hover:scale-105 transition-all duration-300 font-space-grotesk">
                    Începe Gratuit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 text-center border border-sky-500/10 hover:border-sky-500/20 transition-colors">
                <div className="text-4xl font-black-ops text-sky-400">100+</div>
                <div className="text-gray-400 font-space-grotesk">Țări</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 text-center border border-blue-500/10 hover:border-blue-500/20 transition-colors">
                <div className="text-4xl font-black-ops text-blue-400">50M+</div>
                <div className="text-gray-400 font-space-grotesk">Minute Găzduite</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 text-center border border-purple-500/10 hover:border-purple-500/20 transition-colors">
                <div className="text-4xl font-black-ops text-purple-400">99.9%</div>
                <div className="text-gray-400 font-space-grotesk">Disponibilitate</div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="container mx-auto px-4 py-16 bg-black/40 backdrop-blur-lg rounded-3xl my-12 border border-sky-500/10">
            <h2 className="text-3xl md:text-4xl font-black-ops text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
              Tot ce ai nevoie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <FeatureCard 
                icon={<Video className="text-sky-400" />}
                title="Apeluri Video HD"
                description="Video cristal cu optimizare inteligentă a lățimii de bandă"
              />
              <FeatureCard 
                icon={<Monitor className="text-blue-400" />}
                title="Partajare Ecran"
                description="Partajează ecranul cu un singur clic"
              />
              <FeatureCard 
                icon={<MessageSquare className="text-purple-400" />}
                title="Chat și Note"
                description="Chat integrat și note colaborative"
              />
              <FeatureCard 
                icon={<Lock className="text-sky-400" />}
                title="Securitate Bancară"
                description="Criptare end-to-end pentru toate întâlnirile"
              />
              <FeatureCard 
                icon={<Users className="text-blue-400" />}
                title="Întâlniri Mari"
                description="Găzduiește până la 100 de participanți"
              />
              <FeatureCard 
                icon={<Monitor className="text-purple-400" />}
                title="Înregistrare"
                description="Înregistrează și partajează întâlnirile tale"
              />
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-sky-500/10 py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                  © 2025 ToKu. Toate drepturile rezervate.
                </div>
                <div className="flex gap-6">
                  <a href="https://github.com/mrarmas02" 
                    className="text-gray-400 hover:text-sky-400 transition-colors">
                    GitHub
                  </a>
                  <a href="https://www.buymeacoffee.com/alexandruarmas" 
                    className="text-gray-400 hover:text-purple-400 transition-colors">
                    Cumpără-mi o cafea
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-black/40 hover:bg-black/50 backdrop-blur-lg rounded-xl p-6 transition-all hover:scale-105 border border-sky-500/10 hover:border-sky-500/20">
      <div className="h-12 w-12 rounded-lg bg-black/60 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-black-ops mb-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">{title}</h3>
      <p className="text-gray-400 font-space-grotesk">{description}</p>
    </div>
  );
} 