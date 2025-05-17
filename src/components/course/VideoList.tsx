'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoPlayer } from './VideoPlayer';
import { Lock, PlayCircle, CheckCircle } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  dayNumber: number;
  progress?: number;
  completed?: boolean;
  unlocked: boolean;
}

interface VideoListProps {
  courseId: string;
}

export function VideoList({ courseId }: VideoListProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/videos`);
        const data = await response.json();
        setVideos(data.videos);
        
        // Select first unlocked video if none selected
        if (!selectedVideo && data.videos.some((v: Video) => v.unlocked)) {
          setSelectedVideo(data.videos.find((v: Video) => v.unlocked).id);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [courseId]);

  const handleVideoProgress = async (videoId: string, progress: number) => {
    setVideos(videos.map(video => 
      video.id === videoId ? { ...video, progress } : video
    ));
  };

  const handleVideoComplete = async (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId ? { ...video, completed: true } : video
    ));
  };

  return (
    <div className="space-y-6">
      {selectedVideo && (
        <div className="mb-8">
          <VideoPlayer
            videoId={selectedVideo}
            onProgress={(progress) => handleVideoProgress(selectedVideo, progress)}
            onComplete={() => handleVideoComplete(selectedVideo)}
          />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card 
            key={video.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              video.id === selectedVideo ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => video.unlocked && setSelectedVideo(video.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Day {video.dayNumber}</span>
                {video.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : video.unlocked ? (
                  <PlayCircle className="h-6 w-6 text-blue-500" />
                ) : (
                  <Lock className="h-6 w-6 text-gray-400" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
              {video.progress !== undefined && video.unlocked && (
                <div className="mt-2">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${video.progress}%` }}
                    />
                  </div>
                </div>
              )}
              {!video.unlocked && (
                <p className="mt-2 text-sm text-gray-500">
                  Unlocks on Day {video.dayNumber}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}