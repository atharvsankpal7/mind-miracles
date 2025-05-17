import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth_options';
import prisma from '@/db';
import { redirect } from 'next/navigation';
import VideoPlayer from '@/components/video/VideoPlayer';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }

  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    include: {
      videos: {
        orderBy: { dayNumber: 'asc' },
        include: {
          progress: {
            where: { userId: session.user.id },
          },
        },
      },
    },
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  const purchaseDate = course.createdate;
  const daysSincePurchase = Math.floor(
    (Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{course.name}</h1>
      
      <div className="grid gap-8">
        {course.videos.map((video) => {
          const isUnlocked = daysSincePurchase >= video.dayNumber - 1;
          const progress = video.progress[0]?.progress || 0;
          const isCompleted = video.progress[0]?.completed || false;

          return (
            <div
              key={video.id}
              className={`p-6 rounded-lg border ${
                isUnlocked ? 'border-gray-200' : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{video.title}</h2>
                  <p className="text-gray-600 mt-1">{video.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Day {video.dayNumber}
                    {!isUnlocked && ` (Unlocks in ${video.dayNumber - daysSincePurchase - 1} days)`}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isCompleted && (
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      Completed
                    </span>
                  )}
                  {isUnlocked && !isCompleted && progress > 0 && (
                    <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                      {Math.round(progress)}% watched
                    </span>
                  )}
                </div>
              </div>

              {isUnlocked && (
                <div className="mt-4">
                  <VideoPlayer
                    videoId={video.id}
                    title={video.title}
                    description={video.description}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 