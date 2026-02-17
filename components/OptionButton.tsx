
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface OptionButtonProps {
    option: string;
    idx: number; // 0-3
    isSelected: boolean;
    isDisabled: boolean;
    result?: 'correct' | 'wrong' | null;
    correctOption?: string | null;
    onClick: () => void;
}

export default function OptionButton({
    option,
    idx,
    isSelected,
    isDisabled,
    result,
    correctOption,
    onClick,
}: OptionButtonProps) {
    // Determine state style
    let stateClass = "border-white/10 hover:border-primary/50 hover:bg-white/5";

    if (isSelected) {
        stateClass = "border-primary bg-primary/20 ring-1 ring-primary";
    }

    if (isDisabled && option === correctOption) {
        stateClass = "border-green-500 bg-green-500/20 text-green-200 ring-1 ring-green-500";
    } else if (isSelected && result === 'wrong') {
        stateClass = "border-red-500 bg-red-500/20 text-red-200 ring-1 ring-red-500";
    } else if (isSelected && result === 'correct') {
        stateClass = "border-green-500 bg-green-500/20 text-green-200 ring-1 ring-green-500";
    } else if (isDisabled) {
        stateClass = "opacity-50 cursor-not-allowed border-white/5";
    }

    // Animation delay based on index
    return (
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            disabled={isDisabled}
            onClick={onClick}
            className={cn(
                "w-full text-left p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 relative overflow-hidden group",
                stateClass
            )}
        >
            <div className="relative z-10 flex items-center justify-between">
                <span className="font-semibold text-lg">{option}</span>
                {isSelected && result === 'correct' && (
                    <span className="text-green-400">✓</span>
                )}
                {isSelected && result === 'wrong' && (
                    <span className="text-red-400">✗</span>
                )}
            </div>

            {/* Hover effect gradient */}
            {!isDisabled && !isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            )}
        </motion.button>
    );
}
