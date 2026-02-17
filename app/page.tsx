
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import QuestionCard from '@/components/QuestionCard';
import ScorePanel from '@/components/ScorePanel';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Game State
    const [question, setQuestion] = useState<any>(null);
    const [userState, setUserState] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
    const [correctOption, setCorrectOption] = useState<string | null>(null);

    // Initialize User
    useEffect(() => {
        let storedId = localStorage.getItem('brainbolt_user_id');
        if (!storedId) {
            storedId = uuidv4();
            localStorage.setItem('brainbolt_user_id', storedId);
        }
        setUserId(storedId);
        fetchNextQuestion(storedId);
    }, []);

    const fetchNextQuestion = async (uid: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/quiz/next?userId=${uid}`);
            const data = await res.json();

            if (data.question) {
                setQuestion(data.question);
                setUserState(data.userState);

                // Reset local round state
                setSelectedOption(null);
                setResult(null);
                setCorrectOption(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = async (option: string) => {
        if (!userId || !question || result) return;

        setSelectedOption(option);

        // Optimistic IO? Maybe. But we need server validation.
        // For now, wait for server.

        // Idempotency key per question-attempt
        const idempotencyKey = `${userId}-${question.id}-${Date.now()}`;

        try {
            const res = await fetch('/api/quiz/answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    questionId: question.id,
                    selectedOption: option,
                    idempotencyKey
                }),
            });

            const data = await res.json();

            setResult(data.result);
            setCorrectOption(data.correctOption);
            setUserState(data.userState); // Update score/streak immediately

            // Auto advance
            setTimeout(() => {
                fetchNextQuestion(userId);
            }, 2000); // 2s delay to show result

        } catch (err) {
            console.error(err);
        }
    };

    if (!userState && loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground pb-20">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 flex flex-col items-center">

                {userState && (
                    <div className="w-full max-w-2xl animate-in fade-in slide-in-from-top-4 duration-700">
                        <ScorePanel
                            score={userState.score}
                            streak={userState.currentStreak}
                            difficulty={userState.currentDifficulty}
                        />
                    </div>
                )}

                {question ? (
                    <QuestionCard
                        question={question}
                        isSubmitting={!!result}
                        onAnswer={handleAnswer}
                        result={result}
                        correctOption={correctOption}
                        selectedOption={selectedOption}
                    />
                ) : (
                    !loading && <div className="text-center mt-20">Failed to load question.</div>
                )}

            </div>
        </main>
    );
}
