import { NextRequest, NextResponse } from "next/server";
import { getVideoUrl } from "@/lib/s3";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";
import db from "@/db";

export async function GET(req: NextRequest, { params }: { params: { videoId: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const video = await db.video.findUnique({
      where: { id: params.videoId },
      include: { course: true },
    });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Check if user has access to the course
    const userCourse = await db.course.findFirst({
      where: {
        id: video.courseId,
        userId: session.user.id,
      },
    });

    if (!userCourse) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Check if video should be unlocked based on purchase date
    const daysSincePurchase = Math.floor(
      (Date.now() - userCourse.from.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSincePurchase < video.dayNumber - 1) {
      return NextResponse.json({ error: "Video not yet unlocked" }, { status: 403 });
    }

    const videoUrl = await getVideoUrl(video.s3Key);

    return NextResponse.json({ url: videoUrl });
  } catch (error) {
    console.error("Error getting video URL:", error);
    return NextResponse.json({ error: "Failed to get video URL" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { videoId: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { progress, completed } = await req.json();

    const videoProgress = await db.videoProgress.upsert({
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
      },
    });

    return NextResponse.json(videoProgress);
  } catch (error) {
    console.error("Error updating video progress:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}