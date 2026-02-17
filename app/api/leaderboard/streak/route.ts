
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const leaders = await prisma.leaderboardStreak.findMany({
            orderBy: { streak: 'desc' },
            take: 10,
        });

        // Also get user rank if userId provided
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get('userId');
        let userRank = null;

        if (userId) {
            const userStreak = await prisma.leaderboardStreak.findUnique({ where: { userId } });
            if (userStreak) {
                const higher = await prisma.leaderboardStreak.count({
                    where: { streak: { gt: userStreak.streak } }
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
