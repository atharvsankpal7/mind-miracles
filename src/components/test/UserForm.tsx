'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  score: number;
}

export function UserForm({ score }: Props) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getRemark = (score: number) => {
    if (score >= 15) {
      return "Your responses indicate significant stress levels. It's important to seek professional support for your mental well-being.";
    } else if (score >= 10) {
      return "You're experiencing moderate stress. Consider talking to someone you trust or a counselor.";
    } else {
      return 'Your stress levels appear to be manageable. Continue practicing self-care and maintaining your mental health.';
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-result', {
        method: 'POST',
        body: JSON.stringify({ ...data, score }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Thank you for completing the assessment');
        router.push('/');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to submit');
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Assessment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Score: {score}/20</p>
          <p className="text-gray-700">{getRemark(score)}</p>
        </CardContent>
      </Card>
 
      <Card>
        <CardHeader>
          <CardTitle>
            If you want to manage your stress level, fill the form!!!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                {...register('age')}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                {...register('occupation')}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                {...register('mobile')}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                required
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
