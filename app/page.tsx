import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                A
              </div>
              <span className="text-xl font-bold text-white tracking-tight">ApniSec</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-sm font-medium hover:text-blue-400 transition">Services</Link>
              <Link href="#about" className="text-sm font-medium hover:text-blue-400 transition">About</Link>
              <Link href="#contact" className="text-sm font-medium hover:text-blue-400 transition">Contact</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-white hover:text-blue-400 transition">
                Login
              </Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next-Gen Cybersecurity Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
            Secure Your Assets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Before It's Too Late
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
            ApniSec provides enterprise-grade vulnerability assessment, penetration testing, and cloud security management in one unified dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition flex items-center justify-center gap-2">
              Start Free Trial
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl border border-slate-700 transition">
              Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Comprehensive security solutions tailored for modern enterprises.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cloud Security',
                desc: 'Real-time monitoring and misconfiguration detection for AWS, Azure, and GCP environments.',
                icon: '☁️',
              },
              {
                title: 'VAPT',
                desc: 'Vulnerability Assessment & Penetration Testing to identify weak points in your infrastructure.',
                icon: '🛡️',
              },
              {
                title: 'Red Teaming',
                desc: 'Simulated real-world cyber attacks to test your defense capabilities and response time.',
                icon: '🎯',
              },
            ].map((service, i) => (
              <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition hover:shadow-2xl hover:shadow-blue-500/10 group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition duration-300">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">A</div>
            <span className="font-bold text-white">ApniSec</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ApniSec Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-white transition">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-white transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}