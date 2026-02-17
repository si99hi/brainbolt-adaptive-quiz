
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const [userState, totalAnswers, correctAnswers] = await prisma.$transaction([
            prisma.userState.findUnique({
                where: { userId },
                include: { user: { select: { username: true } } }
            }),
            prisma.answerLog.count({ where: { userId } }),
            prisma.answerLog.count({ where: { userId, isCorrect: true } }),
        ]);

        if (!userState) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

        return NextResponse.json({
            username: userState.user.username,
            currentScore: userState.score,
            currentStreak: userState.currentStreak,
            highestDifficulty: userState.currentDifficulty, // Approximate
            totalAnswers,
            accuracy: parseFloat(accuracy.toFixed(1)),
            ranking: 0 // TODO: Implement ranking query
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
