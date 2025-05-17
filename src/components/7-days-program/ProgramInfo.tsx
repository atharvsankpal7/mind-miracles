import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const ProgramInfo = () => {
  return (
    <>
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>About the Program</CardTitle>
              <CardDescription>
                What you&apos;ll learn in 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Our intensive 7-day program is designed to help you:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Develop powerful mindset strategies</li>
                <li>Create lasting positive habits</li>
                <li>Master emotional intelligence</li>
                <li>Build effective communication skills</li>
                <li>Learn stress management techniques</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
