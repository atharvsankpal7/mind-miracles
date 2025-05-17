import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { progress, completed } = await req.json();

    const videoProgress = await prisma.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId: session.user.id,
          videoId: params.videoId,
        },
      },
      update: {
        progress,
        completed,
        lastWatched: new Date(),
      },
      create: {
        userId: session.user.id,
        videoId: params.videoId,
        progress,
        completed,
        lastWatched: new Date(),
      },
    });

    return NextResponse.json(videoProgress);
  } catch (error) {
    console.error('Error updating video progress:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const progress = await prisma.videoProgress.findUnique({
      where: {
        userId_videoId: {
          userId: session.user.id,
          videoId: params.videoId,
        },
      },
    });

    return NextResponse.json(progress || { progress: 0, completed: false });
  } catch (error) {
    console.error('Error getting video progress:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 