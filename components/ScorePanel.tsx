
import { Flame, Zap, Brain } from 'lucide-react';

interface ScorePanelProps {
    score: number;
    streak: number;
    difficulty: number;
    momentum?: number;
}

export default function ScorePanel({ score, streak, difficulty }: ScorePanelProps) {
    return (
        <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-8 p-4 bg-muted/20 backdrop-blur-sm border border-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                    <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Score</p>
                    <p className="text-xl font-bold font-mono">{score.toLocaleString()}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${streak > 2 ? 'bg-orange-500/20' : 'bg-muted/20'}`}>
                    <Flame className={`w-5 h-5 ${streak > 2 ? 'text-orange-500 animate-pulse' : 'text-muted-foreground'}`} />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Streak</p>
                    <p className="text-xl font-bold font-mono text-orange-400">x{streak}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Level</p>
                    <div className="flex items-baseline gap-1">
                        <p className="text-xl font-bold font-mono">{difficulty.toFixed(1)}</p>
                        <span className="text-xs text-muted-foreground">/ 10</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
