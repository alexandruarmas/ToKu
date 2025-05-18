"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Video, Shield, Users, Clock, Globe } from "lucide-react";

// Hero section component
const Hero = () => {
  const router = useRouter();
  
  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex-1 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Connect With Anyone, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
                Anywhere, Anytime
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience crystal-clear video calls with advanced features that make virtual meetings feel like you're in the same room.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => router.push("/sign-up")} 
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-blue-500/25"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => router.push("/sign-in")} 
                className="px-8 py-4 rounded-lg border border-slate-600 text-white font-bold text-lg hover:bg-slate-800 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <Image 
                  src="/images/hero-mockup.svg"
                  alt="Video calling app interface"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-2xl border border-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features section
const Features = () => {
  const features = [
    {
      icon: <Video className="w-10 h-10 text-blue-500" />,
      title: "Crystal Clear Video",
      description: "Experience high-definition video with adaptive quality that works even on slower connections."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      title: "End-to-End Encryption",
      description: "Your conversations stay private with enterprise-grade security and encryption."
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: "Up to 100 Participants",
      description: "Host large meetings, webinars, and virtual events with up to 100 concurrent participants."
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-500" />,
      title: "Schedule Meetings",
      description: "Plan ahead with scheduled meetings and calendar integrations."
    },
    {
      icon: <Globe className="w-10 h-10 text-blue-500" />,
      title: "Works Everywhere",
      description: "Join from any device with our web, mobile, and desktop applications."
    },
    {
      icon: <Check className="w-10 h-10 text-blue-500" />,
      title: "Screen Sharing",
      description: "Share your screen, specific applications, or presentations with one click."
    }
  ];
  
  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Powerful Features</h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16">
          Designed to make your video meetings more productive, connected, and secure.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing section
const Pricing = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  
  const plans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: [
        "1-on-1 video calls",
        "Group calls up to 40 minutes",
        "Screen sharing",
        "Chat and messaging",
        "Basic support"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      monthlyPrice: "$12",
      yearlyPrice: "$10",
      features: [
        "Everything in Free",
        "Unlimited meeting duration",
        "Up to 100 participants",
        "Recording and transcriptions",
        "Admin controls",
        "Priority support"
      ],
      cta: "Get Started",
      highlight: true
    },
    {
      name: "Business",
      monthlyPrice: "$20",
      yearlyPrice: "$16",
      features: [
        "Everything in Pro",
        "Company branding",
        "Advanced security features",
        "Analytics and reporting",
        "Dedicated account manager",
        "SSO and advanced user management"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];
  
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-slate-300 text-center max-w-2xl mx-auto mb-10">
          Choose the plan that works for you, whether you're a solo user or a large organization.
        </p>
        
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800 p-1 rounded-lg flex">
            <button 
              onClick={() => setAnnualBilling(false)} 
              className={`px-4 py-2 rounded-md ${!annualBilling ? 'bg-blue-600' : 'text-slate-400'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setAnnualBilling(true)} 
              className={`px-4 py-2 rounded-md ${annualBilling ? 'bg-blue-600' : 'text-slate-400'}`}
            >
              Annual <span className="text-xs bg-green-500 text-white px-1 py-0.5 rounded">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`rounded-xl overflow-hidden ${plan.highlight ? 'ring-2 ring-blue-500 bg-slate-800' : 'bg-slate-800'}`}>
              {plan.highlight && (
                <div className="bg-blue-600 text-center py-2 text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{annualBilling ? plan.yearlyPrice : plan.monthlyPrice}</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <ul className="mb-8 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-lg font-bold ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600'} transition-colors`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA section
const CTA = () => {
  const router = useRouter();
  
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your video meetings?</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of users who've already upgraded their virtual communication experience.
        </p>
        <button 
          onClick={() => router.push("/sign-up")}
          className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center"
        >
          Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="mr-2 bg-blue-500 text-white p-2 rounded">ToKu</div>
              <span className="text-white font-bold">ToKu Video</span>
            </div>
          </div>
          <div className="text-sm">
            &copy; {currentYear} ToKu Video. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main landing page component
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-2 bg-blue-500 text-white p-2 rounded">ToKu</div>
              <span className="text-white font-bold">ToKu Video</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
            </nav>
            <div className="flex items-center gap-4">
              <a href="/sign-in" className="text-white hover:text-blue-300 transition-colors">Sign In</a>
              <a href="/sign-up" className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg text-white">Sign Up</a>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <Hero />
        <Features />
        <Pricing />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage; 