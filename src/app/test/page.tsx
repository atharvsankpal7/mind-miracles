'use client';

import { useState } from 'react';
import { testQuestions, getTestResult } from '@/lib/testData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TestPage() {
  const [answers, setAnswers] = useState<number[]>(new Array(testQuestions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const handleAnswer = (questionIndex: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = score;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!answers.includes(-1)) {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, score) => sum + score, 0);
  };

  const handleCounsellingRedirect = () => {
    router.push('/cources/personal-counselling');
  };

  if (showResult) {
    const totalScore = calculateScore();
    const result = getTestResult(totalScore);
    const maxScore = testQuestions.length * 5;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Your Test Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className={`text-2xl font-bold ${result.color}`}>
                  {result.status}
                </h3>
                <p className="mt-2 text-lg">Score: {percentage}%</p>
                <p className="mt-4 text-gray-600">{result.message}</p>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleCounsellingRedirect}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Schedule Personal Counselling
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Mental Health Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {testQuestions.map((question, questionIndex) => (
                <div key={questionIndex} className="space-y-4">
                  <p className="text-lg font-medium">
                    {questionIndex + 1}. {question.question}
                  </p>
                  <div className="flex flex-col space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        onClick={() => handleAnswer(questionIndex, option.score)}
                        variant={answers[questionIndex] === option.score ? "default" : "outline"}
                        className="w-full py-4 text-left justify-start text-lg hover:bg-green-50"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-8 text-center">
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={answers.includes(-1)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}