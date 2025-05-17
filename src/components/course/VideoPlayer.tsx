'use client';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';

interface VideoPlayerProps {
  videoId: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export function VideoPlayer({ videoId, onProgress, onComplete }: VideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch(`/api/videos/${videoId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video URL');
        }
        const data = await response.json();
        setVideoUrl(data.url);
      } catch (error) {
        toast.error('Error loading video');
        console.error('Error:', error);
      }
    };

    fetchVideoUrl();
  }, [videoId]);

  const handleProgress = async ({ played }: { played: number }) => {
    const newProgress = Math.floor(played * 100);
    if (newProgress > progress) {
      setProgress(newProgress);
      onProgress?.(newProgress);

      // Update progress in backend
      try {
        await fetch(`/api/videos/${videoId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            progress: newProgress,
            completed: newProgress >= 90,
          }),
        });

        if (newProgress >= 90 && !completed) {
          setCompleted(true);
          onComplete?.();
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  const [completed, setCompleted] = useState(false);

  if (!videoUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onProgress={handleProgress}
        progressInterval={1000}
      />
    </div>
  );
}