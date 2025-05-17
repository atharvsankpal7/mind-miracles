import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";
import db from "@/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const course = await db.course.findUnique({
      where: { id: params.courseId },
      include: {
        videos: {
          orderBy: { dayNumber: 'asc' },
          include: {
            progress: {
              where: { userId: session.user.id }
            }
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const daysSincePurchase = Math.floor(
      (Date.now() - course.from.getTime()) / (1000 * 60 * 60 * 24)
    );

    const videos = course.videos.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      dayNumber: video.dayNumber,
      progress: video.progress[0]?.progress || 0,
      completed: video.progress[0]?.completed || false,
      unlocked: video.dayNumber <= daysSincePurchase + 1
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}