
import Link from 'next/link';
import { Trophy, Activity, BrainCircuit } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-foreground tracking-tighter">
                    <BrainCircuit className="w-6 h-6 text-primary" />
                    <span>BrainBolt</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Quiz
                    </Link>
                    <Link href="/leaderboard" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                        <Trophy className="w-4 h-4" />
                        <span className="hidden sm:inline">Leaderboard</span>
                    </Link>
                    <Link href="/metrics" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                        <Activity className="w-4 h-4" />
                        <span className="hidden sm:inline">Metrics</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
