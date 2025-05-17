import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth_options';
import prisma from '@/db';
import { redirect } from 'next/navigation';
import VideoUploadForm from '@/components/admin/VideoUploadForm';

interface AdminCoursePageProps {
  params: {
    courseId: string;
  };
}

export default async function AdminCoursePage({ params }: AdminCoursePageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }

  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    include: {
      videos: {
        orderBy: { dayNumber: 'asc' },
      },
    },
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{course.name}</h1>
        <div className="text-sm text-gray-500">
          Created: {new Date(course.createdate).toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload New Video</h2>
          <VideoUploadForm courseId={params.courseId} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Course Videos</h2>
          <div className="space-y-4">
            {course.videos.map((video) => (
              <div
                key={video.id}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {video.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Day {video.dayNumber} • Duration: {video.duration} minutes
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 