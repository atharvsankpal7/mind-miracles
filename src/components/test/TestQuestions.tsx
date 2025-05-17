'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { questions } from '@/lib/questions';
import { toast } from 'sonner';

interface Props {
  setShowForm: (show: boolean) => void;
  setScore: (score: number) => void;
}

export function TestQuestions({ setShowForm, setScore }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      toast.error('Please answer all questions');
      return;
    }

    let totalScore = 0;
    Object.entries(answers).forEach(([_, value]) => {
      if (value === 'yes') totalScore += 2;
      else if (value === 'sometimes') totalScore += 1;
    });

    setScore(totalScore);
    setShowForm(true);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-2xl font-bold text-green-800 md:text-3xl">
          Mental Health Assessment
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Please answer honestly for the most accurate results
        </p>
      </div>

      <div className="mb-6 rounded-lg bg-green-50 p-4">
        <div className="mb-4">
          <p className="mb-2 font-semibold text-green-800">मराठी:</p>
          <p>होय – हो, मी हे वारंवार अनुभवत आहे</p>
          <p>कधीमधी – अधूनमधून वाटतं</p>
          <p>नाही – मला असं वाटलेलं नाही</p>
        </div>
        <div>
          <p className="mb-2 font-semibold text-green-800">English:</p>
          <p>Yes – I feel this often or daily</p>
          <p>Sometimes – I feel this occasionally</p>
          <p>No – I haven't felt this</p>
        </div>
      </div>

      {questions.map((q, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Question {index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="mb-2 text-base font-medium text-green-800">
                {q.marathi}
              </p>
              <p className="text-base text-gray-600">{q.english}</p>
            </div>
            <RadioGroup
              onValueChange={(value) =>
                setAnswers((prev) => ({ ...prev, [index]: value }))
              }
              value={answers[index]}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`yes-${index}`} />
                  <Label htmlFor={`yes-${index}`}>Yes / होय</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id={`sometimes-${index}`} />
                  <Label htmlFor={`sometimes-${index}`}>
                    Sometimes / कधीमधी
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`no-${index}`} />
                  <Label htmlFor={`no-${index}`}>No / नाही</Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={handleSubmit}
        className="mb-8 w-full bg-green-700 hover:bg-green-800"
      >
        Submit
      </Button>
    </div>
  );
}
