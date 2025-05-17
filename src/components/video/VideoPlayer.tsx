import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
}

export default function VideoPlayer({ videoId, title, description }: VideoPlayerProps) {
  const { data: session } = useSession();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const progressUpdateInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch(`/api/videos/${videoId}/stream`);
        if (!response.ok) {
          throw new Error('Failed to get video URL');
        }
        const data = await response.json();
        setVideoUrl(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load video');
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/videos/${videoId}/progress`);
        if (response.ok) {
          const data = await response.json();
          setProgress(data.progress);
          setIsCompleted(data.completed);
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    };

    fetchVideoUrl();
    fetchProgress();

    return () => {
      if (progressUpdateInterval.current) {
        clearInterval(progressUpdateInterval.current);
      }
    };
  }, [videoId]);

  const updateProgress = async (currentProgress: number, completed: boolean) => {
    try {
      await fetch(`/api/videos/${videoId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress: currentProgress,
          completed,
        }),
      });
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);

    const isVideoCompleted = currentProgress >= 95; // Consider 95% as completed
    if (isVideoCompleted && !isCompleted) {
      setIsCompleted(true);
      updateProgress(currentProgress, true);
    }
  };

  const handleVideoEnd = () => {
    if (progressUpdateInterval.current) {
      clearInterval(progressUpdateInterval.current);
    }
    updateProgress(100, true);
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!videoUrl) {
    return <div>Loading video...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          Progress: {Math.round(progress)}% {isCompleted && '(Completed)'}
        </p>
      </div>
    </div>
  );
} 