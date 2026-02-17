
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import OptionButton from './OptionButton';
import { cn } from '@/lib/utils'; // Keep existing utility

interface Question {
    id: string;
    content: string;
    options: string[];
    difficulty: number;
}

interface QuestionCardProps {
    question: Question;
    isSubmitting: boolean;
    onAnswer: (option: string) => void;
    result: 'correct' | 'wrong' | null;
    correctOption?: string | null;
    selectedOption: string | null;
}

export default function QuestionCard({
    question,
    isSubmitting,
    onAnswer,
    result,
    correctOption,
    selectedOption,
}: QuestionCardProps) {

    return (
        <div className="w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-medium text-muted-foreground px-3 py-1 rounded-full bg-white/5 border border-white/5">
                            Difficulty {question.difficulty}
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight tracking-tight">
                        {question.content}
                    </h2>

                    <div className="space-y-3">
                        {question.options.map((option, idx) => {
                            // Determine state for option button
                            let buttonResult: 'correct' | 'wrong' | null = null;

                            if (result) {
                                if (option === correctOption) buttonResult = 'correct';
                                else if (option === selectedOption && result === 'wrong') buttonResult = 'wrong';
                            }

                            return (
                                <OptionButton
                                    key={`${question.id}-${idx}`}
                                    option={option}
                                    idx={idx}
                                    isSelected={selectedOption === option}
                                    isDisabled={isSubmitting || !!result}
                                    correctOption={correctOption}
                                    result={buttonResult} // Pass specific result for this button
                                    onClick={() => !result && onAnswer(option)}
                                />
                            );
                        })}
                    </div>

                    {/* Result Feedback Overlay or Message */}
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "mt-6 p-4 rounded-xl text-center font-bold text-lg",
                                result === 'correct' ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                            )}
                        >
                            {result === 'correct' ? "Correct! + Momentum" : "Wrong Answer"}
                        </motion.div>
                    )}

                </motion.div>
            </AnimatePresence>
        </div>
    );
}
