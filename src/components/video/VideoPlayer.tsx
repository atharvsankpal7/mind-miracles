'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  vimeoId: string;
}

export default function VideoPlayer({ videoId, title, description, vimeoId }: VideoPlayerProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
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

    fetchProgress();
  }, [videoId]);

  return (
    <div className="space-y-4">
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
          <iframe 
            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
            title={title}
          />
        </div>
        <script src="https://player.vimeo.com/api/player.js" async></script>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
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