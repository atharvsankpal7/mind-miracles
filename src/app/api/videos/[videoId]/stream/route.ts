import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSignedVideoUrl } from '@/lib/aws';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const video = await prisma.video.findUnique({
      where: { id: params.videoId },
      include: { course: true },
    });

    if (!video) {
      return new NextResponse('Video not found', { status: 404 });
    }

    // Check if user has access to the course
    const hasAccess = await prisma.course.findFirst({
      where: {
        id: video.courseId,
        userId: session.user.id,
      },
    });

    if (!hasAccess) {
      return new NextResponse('Access denied', { status: 403 });
    }

    // Check if video is unlocked based on purchase date
    const courseAccess = await prisma.course.findFirst({
      where: {
        id: video.courseId,
        userId: session.user.id,
      },
    });

    if (!courseAccess) {
      return new NextResponse('Course access not found', { status: 404 });
    }

    const purchaseDate = courseAccess.createdate;
    const daysSincePurchase = Math.floor(
      (Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSincePurchase < video.dayNumber - 1) {
      return new NextResponse('Video not yet unlocked', { status: 403 });
    }

    // Get signed URL
    const signedUrl = await getSignedVideoUrl(video.s3Key);

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error('Error getting video URL:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 