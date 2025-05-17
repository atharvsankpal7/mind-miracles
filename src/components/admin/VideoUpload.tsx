'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface VideoUploadProps {
  courseId: string;
}

export function VideoUpload({ courseId }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dayNumber, setDayNumber] = useState(1);

  const handleUpload = async () => {
    if (!file || !title || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    setUploading(true);

    try {
      // Get presigned URL
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          courseId,
          title,
          description,
          dayNumber,
          duration: 0, // This would be calculated from the video file
        }),
      });

      const { uploadUrl, videoId } = await response.json();

      // Upload to S3
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      toast.success('Video uploaded successfully');
      setFile(null);
      setTitle('');
      setDescription('');
      setDayNumber(1);
    } catch (error) {
      toast.error('Failed to upload video');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h2 className="text-xl font-semibold">Upload Video</h2>
      
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <Input
          type="number"
          placeholder="Day Number"
          min={1}
          value={dayNumber}
          onChange={(e) => setDayNumber(parseInt(e.target.value))}
        />
        
        <Input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <Button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="w-full"
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </Button>
    </div>
  );
}