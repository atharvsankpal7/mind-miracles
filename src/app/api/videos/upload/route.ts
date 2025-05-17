import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "@/lib/s3";
import { getServerSession } from "next-auth";
import { AdminMails } from "@/lib";
import { authOptions } from "@/lib/auth_options";
import db from "@/db";
import { uploadToS3 } from '@/lib/aws';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const courseId = formData.get('courseId') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dayNumber = parseInt(formData.get('dayNumber') as string);

    if (!file || !courseId || !title || !description || !dayNumber) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique key for the video
    const key = `videos/${courseId}/${Date.now()}-${file.name}`;

    // Upload to S3
    await uploadToS3(buffer, key, file.type);

    // Create video record in database
    const video = await prisma.video.create({
      data: {
        title,
        description,
        s3Key: key,
        duration: 0, // You might want to extract this from the video file
        dayNumber,
        courseId,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error uploading video:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}