
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const leaders = await prisma.leaderboardScore.findMany({
            orderBy: { score: 'desc' },
            take: 10,
        });

        // Also get user rank if userId provided
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get('userId');
        let userRank = null;

        if (userId) {
            // Count how many users have higher score
            const userScore = await prisma.leaderboardScore.findUnique({ where: { userId } });
            if (userScore) {
                const higher = await prisma.leaderboardScore.count({
                    where: { score: { gt: userScore.score } }
                });
                userRank = higher + 1;
            }
        }

        return NextResponse.json({
            leaders,
            userRank
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
