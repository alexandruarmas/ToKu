"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Video, Shield, Users, Clock, Globe } from "lucide-react";

// Hero section component
const Hero = () => {
  const router = useRouter();
  
  return (
    <section className="relative bg-gradient-to-b from-black to-gray-900 pt-16 pb-16 sm:pt-20 sm:pb-32 overflow-hidden hero-section">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/4 -left-20 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex-1 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Connect With Anyone, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Anywhere, Anytime
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-2xl mx-auto lg:mx-0 mobile-text-lg">
              Experience crystal-clear video calls with advanced features that make virtual meetings feel like you're in the same room.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => router.push("/sign-up")} 
                className="px-5 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-base sm:text-lg hover:opacity-90 transition-all shadow-lg mobile-full-width"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => router.push("/sign-in")} 
                className="px-5 py-2 sm:px-6 sm:py-3 rounded-lg border border-yellow-600 text-yellow-500 font-bold text-base sm:text-lg hover:bg-yellow-600/10 transition-all mobile-full-width"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute top-0 -left-4 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <Image 
                  src="/images/hero-mockup.svg"
                  alt="Video calling app interface"
                  width={500}
                  height={375}
                  className="rounded-2xl shadow-2xl border border-yellow-600/30 w-full h-auto"
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
      icon: <Video className="w-8 h-8 text-yellow-500" />,
      title: "Crystal Clear Video",
      description: "Experience high-definition video with adaptive quality that works even on slower connections."
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      title: "End-to-End Encryption",
      description: "Your conversations stay private with enterprise-grade security and encryption."
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      title: "Up to 100 Participants",
      description: "Host large meetings, webinars, and virtual events with up to 100 concurrent participants."
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      title: "Schedule Meetings",
      description: "Plan ahead with scheduled meetings and calendar integrations."
    },
    {
      icon: <Globe className="w-8 h-8 text-yellow-500" />,
      title: "Works Everywhere",
      description: "Join from any device with our web, mobile, and desktop applications."
    },
    {
      icon: <Check className="w-8 h-8 text-yellow-500" />,
      title: "Screen Sharing",
      description: "Share your screen, specific applications, or presentations with one click."
    }
  ];
  
  return (
    <section className="py-12 sm:py-16 bg-black mobile-py-8" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 text-white">Powerful Features</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
          Designed to make your video meetings more productive, connected, and secure.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mobile-card-grid">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 p-4 sm:p-6 rounded-xl shadow-md border border-gray-800 hover:border-yellow-600/50 transition-all">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
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
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-900 to-black text-white mobile-py-8" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Choose the plan that works for you, whether you're a solo user or a large organization.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 p-1 rounded-lg flex">
            <button 
              onClick={() => setAnnualBilling(false)} 
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm ${!annualBilling ? 'bg-yellow-600 text-black' : 'text-gray-400'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setAnnualBilling(true)} 
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm ${annualBilling ? 'bg-yellow-600 text-black' : 'text-gray-400'}`}
            >
              Annual <span className="text-xs bg-black text-yellow-400 px-1 py-0.5 rounded">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mobile-card-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`rounded-xl overflow-hidden pricing-card ${plan.highlight ? 'ring-2 ring-yellow-500 bg-gray-900' : 'bg-gray-900'}`}>
              {plan.highlight && (
                <div className="bg-yellow-600 text-center py-2 text-sm font-bold text-black">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{annualBilling ? plan.yearlyPrice : plan.monthlyPrice}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-yellow-500 mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-lg font-bold ${plan.highlight ? 'bg-yellow-600 hover:bg-yellow-500 text-black' : 'bg-gray-800 hover:bg-gray-700 text-white'} transition-colors`}
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
    <section className="py-12 sm:py-16 bg-gradient-to-r from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Ready to transform your video meetings?</h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Join thousands of users who've already upgraded their virtual communication experience.
        </p>
        <button 
          onClick={() => router.push("/sign-up")}
          className="px-5 py-2 sm:px-6 sm:py-3 bg-yellow-600 text-black rounded-lg font-bold text-base sm:text-lg hover:bg-yellow-500 transition-colors inline-flex items-center"
        >
          Get Started Now <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-gray-400 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 footer-grid">
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Developers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="mr-2 bg-yellow-600 text-black p-2 rounded">ToKu</div>
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
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-black max-w-screen overflow-hidden">
      <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-2 bg-yellow-600 text-black p-2 rounded">ToKu</div>
              <span className="text-white font-bold">ToKu Video</span>
            </div>
            
            <button 
              className="md:hidden mobile-menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-300 hover:text-yellow-500 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-yellow-500 transition-colors">Pricing</a>
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Documentation</a>
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">About</a>
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              <a href="/sign-in" className="text-white hover:text-yellow-500 transition-colors px-3 py-2">Sign In</a>
              <a href="/sign-up" className="bg-yellow-600 hover:bg-yellow-500 transition-colors px-4 py-2 rounded-lg text-black">Sign Up</a>
            </div>
          </div>
          
          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 py-4 bg-gray-900 rounded-lg">
              <div className="flex flex-col gap-2 px-4">
                <a href="#features" className="text-gray-300 hover:text-yellow-500 transition-colors py-2">Features</a>
                <a href="#pricing" className="text-gray-300 hover:text-yellow-500 transition-colors py-2">Pricing</a>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors py-2">Documentation</a>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors py-2">About</a>
                <div className="pt-2 mt-2 border-t border-gray-800 flex flex-col gap-2">
                  <a href="/sign-in" className="text-white hover:text-yellow-500 transition-colors py-2">Sign In</a>
                  <a href="/sign-up" className="bg-yellow-600 hover:bg-yellow-500 transition-colors py-2 px-4 rounded-lg text-black text-center">Sign Up</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="overflow-x-hidden max-w-screen">
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