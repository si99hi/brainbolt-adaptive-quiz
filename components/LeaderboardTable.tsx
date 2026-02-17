
import { Trophy, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface Leader {
    userId: string;
    username: string;
    score?: number;
    streak?: number;
}

interface LeaderboardTableProps {
    type: 'score' | 'streak';
    data: Leader[];
    userRank?: number | null;
}

export default function LeaderboardTable({ type, data, userRank }: LeaderboardTableProps) {
    return (
        <div className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                {type === 'score' ? <Trophy className="text-yellow-500 w-5 h-5" /> : <Flame className="text-orange-500 w-5 h-5" />}
                <h3 className="font-bold text-lg capitalize">{type} Leaders</h3>
            </div>

            <div className="divide-y divide-white/5">
                {data.map((leader, idx) => (
                    <motion.div
                        key={leader.userId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
                ${idx === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                                    idx === 1 ? 'bg-zinc-400/20 text-zinc-400' :
                                        idx === 2 ? 'bg-amber-700/20 text-amber-700' : 'bg-white/10 text-muted-foreground'
                                }`}
                            >
                                {idx + 1}
                            </div>
                            <span className="font-medium truncate max-w-[150px] sm:max-w-xs">{leader.username || `User ${leader.userId.slice(0, 4)}`}</span>
                        </div>

                        <div className="font-mono font-bold text-lg">
                            {type === 'score' ? leader.score?.toLocaleString() : leader.streak}
                        </div>
                    </motion.div>
                ))}

                {data.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">No data yet</div>
                )}
            </div>

            {userRank && (
                <div className="p-4 bg-primary/10 border-t border-primary/20 flex items-center justify-between">
                    <span className="text-sm text-primary-foreground">Your Rank</span>
                    <span className="font-bold text-primary">#{userRank}</span>
                </div>
            )}
        </div>
    );
}
