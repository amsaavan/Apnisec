// components/Navbar.tsx
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-cyber-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-cyber-primary" />
            <span className="font-bold text-xl tracking-wider text-white">
              Apni<span className="text-cyber-primary">Sec</span>
            </span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="hidden md:block hover:text-cyber-primary transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="/" className="hidden md:block hover:text-cyber-primary transition-colors text-sm font-medium">
              About
            </Link>
            <Link 
              href="/login" 
              className="bg-cyber-primary hover:bg-cyber-hover text-white px-4 py-2 rounded-md font-semibold transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            >
              Login / Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}