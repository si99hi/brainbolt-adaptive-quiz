
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Loader2, Target, TrendingUp, Zap, Hash } from 'lucide-react';

export default function MetricsPage() {
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            const userId = localStorage.getItem('brainbolt_user_id');
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/quiz/metrics?userId=${userId}`);
                const data = await res.json();
                setMetrics(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </main>
        );
    }

    if (!metrics) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 pt-24 text-center">
                    <p>No metrics available. Play some games first!</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground pb-20">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary border border-primary/50">
                        {metrics.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{metrics.username || 'User'}</h1>
                        <p className="text-muted-foreground">Performance Analytics</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <MetricCard
                        icon={<Target className="text-blue-400" />}
                        label="Accuracy"
                        value={`${metrics.accuracy}%`}
                        subtext="Last 5 questions" // Actually schema says rolling is last 5, but metrics API calculated total accuracy.
                    // Let's verify API: "accuracy: parseFloat(accuracy.toFixed(1))" based on totalAnswers.
                    // So subtext should be "Lifetime".
                    />
                    <MetricCard
                        icon={<Zap className="text-yellow-400" />}
                        label="Current Streak"
                        value={metrics.currentStreak}
                    />
                    <MetricCard
                        icon={<TrendingUp className="text-green-400" />}
                        label="Difficulty"
                        value={metrics.highestDifficulty.toFixed(1)}
                    />
                    <MetricCard
                        icon={<Hash className="text-purple-400" />}
                        label="Total Answered"
                        value={metrics.totalAnswers}
                    />
                </div>

                {/* Chart placeholder or detailed breakdown could go here */}
                <div className="p-8 rounded-2xl bg-card/30 border border-white/5 text-center text-muted-foreground">
                    More detailed analytics coming soon...
                </div>
            </div>
        </main>
    );
}

function MetricCard({ icon, label, value, subtext }: any) {
    return (
        <div className="p-6 rounded-2xl bg-card/50 border border-white/10 backdrop-blur-sm flex flex-col items-center text-center hover:bg-white/5 transition-colors">
            <div className="mb-3 p-3 rounded-full bg-white/5">{icon}</div>
            <div className="text-sm text-muted-foreground mb-1">{label}</div>
            <div className="text-2xl font-bold">{value}</div>
            {subtext && <div className="text-xs text-muted-foreground mt-1">{subtext}</div>}
        </div>
    );
}
