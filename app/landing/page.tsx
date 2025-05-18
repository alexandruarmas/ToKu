import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/10 px-6 py-4 backdrop-blur-md dark:bg-black/20 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2 shadow-lg">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={28} 
                height={28} 
                className="h-7 w-7"
              />
            </div>
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">MeetSync</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="rounded-full font-medium text-gray-700 transition-all hover:bg-white/20 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-full bg-indigo-600 font-medium text-white shadow-md transition-all hover:bg-indigo-500 dark:bg-indigo-600/80 dark:hover:bg-indigo-500/80">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative mt-16 flex flex-1 flex-col px-6 md:px-10">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-[40%] -top-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-400/20 blur-3xl dark:from-purple-900/30 dark:to-indigo-900/30"></div>
          <div className="absolute -left-[30%] top-[30%] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-blue-400/20 to-teal-400/20 blur-3xl dark:from-blue-900/30 dark:to-teal-900/30"></div>
        </div>
      
        <div className="mx-auto flex max-w-7xl flex-1 items-center justify-center py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-6 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
                Connect Seamlessly
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">Meetings </span> 
                <span className="text-gray-800 dark:text-gray-100">that bring people together</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Connect with anyone, anywhere with our secure, reliable, and user-friendly video conferencing platform.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/sign-up">
                  <Button size="lg" className="h-14 rounded-full bg-indigo-600 px-8 font-medium text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-indigo-200 dark:bg-indigo-600/80 dark:hover:bg-indigo-500/80 dark:hover:shadow-none">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="h-14 rounded-full border-gray-300 px-8 font-medium text-gray-700 transition-all hover:border-indigo-600 hover:text-indigo-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 scale-[0.8] rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 blur-3xl"></div>
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-sm">
                <div className="aspect-video overflow-hidden rounded-lg bg-white/80">
                  <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-500"></div>
                        <div className="h-3 w-24 rounded-full bg-gray-300"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-video rounded-md bg-white/60 p-2">
                          <div className="h-4 w-1/2 rounded-full bg-gray-200"></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-red-100"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full bg-white px-6 py-20 dark:bg-gray-900 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-indigo-400 dark:to-purple-400 md:text-4xl">Why Choose Our Platform?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Everything you need for seamless virtual meetings in one place</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm transition-all hover:shadow-md dark:from-gray-800 dark:to-gray-800/80">
              <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30"></div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Intuitive Experience</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">Join meetings in seconds with our user-friendly interface. No technical expertise required.</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm transition-all hover:shadow-md dark:from-gray-800 dark:to-gray-800/80">
              <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30"></div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Bank-Level Security</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">End-to-end encryption and advanced security features keep your conversations completely private.</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm transition-all hover:shadow-md dark:from-gray-800 dark:to-gray-800/80">
              <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30"></div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Crystal Clear HD</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">Experience high-quality audio and video, even with low bandwidth connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-indigo-600 px-6 py-24 dark:bg-indigo-900 md:px-10">
        <div className="absolute inset-0 -z-10">
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
          </svg>
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_70%_20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to improve your virtual meetings?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">Join thousands of teams who are already using our platform for their virtual collaboration needs.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button size="lg" className="h-14 min-w-40 rounded-full bg-white px-8 font-medium text-indigo-600 shadow-lg transition-all hover:bg-gray-100">
                Get Started for Free
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="h-14 min-w-40 rounded-full border-white px-8 font-medium text-white transition-all hover:bg-indigo-700">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 px-6 py-12 dark:bg-gray-950 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-600 p-2 shadow-sm">
                  <Image 
                    src="/logo.svg" 
                    alt="Logo" 
                    width={20} 
                    height={20} 
                    className="h-5 w-5"
                  />
                </div>
                <h3 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">MeetSync</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Making virtual connections feel real through seamless video conferencing.</p>
              <div className="mt-4 flex space-x-4">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800"></div>
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Product</h3>
              <ul className="space-y-3">
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Features</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Pricing</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Security</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Enterprise</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Resources</h3>
              <ul className="space-y-3">
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Documentation</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Tutorials</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Blog</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">API Reference</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Company</h3>
              <ul className="space-y-3">
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">About</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Careers</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Privacy Policy</button></li>
                <li><button className="text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">© 2024 MeetSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 