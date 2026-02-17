
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LeaderboardTable from '@/components/LeaderboardTable';
import { Loader2 } from 'lucide-react';

export default function LeaderboardPage() {
    const [scoreLeaders, setScoreLeaders] = useState([]);
    const [streakLeaders, setStreakLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userScoreRank, setUserScoreRank] = useState(null);
    const [userStreakRank, setUserStreakRank] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('brainbolt_user_id');

                const [scoreRes, streakRes] = await Promise.all([
                    fetch(`/api/leaderboard/score${userId ? `?userId=${userId}` : ''}`),
                    fetch(`/api/leaderboard/streak${userId ? `?userId=${userId}` : ''}`)
                ]);

                const scoreData = await scoreRes.json();
                const streakData = await streakRes.json();

                setScoreLeaders(scoreData.leaders);
                setUserScoreRank(scoreData.userRank);

                setStreakLeaders(streakData.leaders);
                setUserStreakRank(streakData.userRank);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground pb-20">
            <Navbar />

            <div className="container mx-auto px-4 pt-24">
                <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    Global Leaderboards
                </h1>

                {loading ? (
                    <div className="flex justify-center mt-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <LeaderboardTable type="score" data={scoreLeaders} userRank={userScoreRank} />
                        <LeaderboardTable type="streak" data={streakLeaders} userRank={userStreakRank} />
                    </div>
                )}
            </div>
        </main>
    );
}
