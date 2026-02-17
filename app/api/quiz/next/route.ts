
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        let userId = searchParams.get('userId');

        // Create user if not exists or if requested
        if (!userId) {
            const newUser = await prisma.user.create({
                data: {
                    username: `User-${Math.floor(Math.random() * 10000)}`,
                    state: {
                        create: {
                            currentDifficulty: 1, // Start easy
                        },
                    },
                },
            });
            userId = newUser.id;
        }

        // Fetch user state
        const userState = await prisma.userState.findUnique({
            where: { userId },
        });

        if (!userState) {
            return NextResponse.json({ error: 'User state not found' }, { status: 404 });
        }

        // Determine target difficulty (clamped 1-10)
        const targetDifficulty = Math.round(userState.currentDifficulty);
        const difficulty = Math.max(1, Math.min(10, targetDifficulty));

        // Get recently answered questions to exclude
        const recentLogs = await prisma.answerLog.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
            take: 5,
            select: { questionId: true },
        });
        const excludedIds = recentLogs.map((log) => log.questionId);

        // Fetch pool of questions at current difficulty
        let questions = await prisma.question.findMany({
            where: {
                difficulty,
                id: { notIn: excludedIds },
            },
        });

        // Fallback: if no questions found (e.g., exhausted pool), fetch any at this difficulty, ignoring exclusion
        if (questions.length === 0) {
            questions = await prisma.question.findMany({
                where: { difficulty },
            });
        }

        // Fallback 2: if still no questions (empty difficulty tier), fetch nearest difficulty
        if (questions.length === 0) {
            questions = await prisma.question.findMany({
                take: 10, // Just get some
            });
        }

        if (questions.length === 0) {
            return NextResponse.json({ error: 'No questions available' }, { status: 500 });
        }

        // Pick random
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];

        // Return sanitized question (no correct answer)
        const { correctOption, ...safeQuestion } = question;
        // Parse options if stored as string, though strictly typing it might be needed.
        // In schema we said String (JSON), so we construct it.
        let options = [];
        try {
            options = JSON.parse(question.options);
        } catch (e) {
            options = ["Error parsing options"];
        }

        return NextResponse.json({
            question: {
                ...safeQuestion,
                options,
            },
            userId,
            userState,
        });
    } catch (error) {
        console.error('Error in /api/quiz/next:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
