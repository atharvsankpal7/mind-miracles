'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { useRecoilState } from 'recoil';
import { registrationFormStateAtom } from '@/store';
import { PayAndRegisterButton } from '../7-days-program/PayAndRegisterButton';
import { courses } from '@/types';

export function ProgramRegistrationForm({
  course_name,
  amount_to_pay,
}: {
  course_name: courses;
  amount_to_pay: number;
}) {
  const [formState, setFormState] = useRecoilState(registrationFormStateAtom);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Register Now</CardTitle>
              <CardDescription>
                Fill in your details to join the program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    type="number"
                    name="whatsapp"
                    required
                    value={formState.whatsapp}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    name="age"
                    required
                    value={formState.age}
                    onChange={handleInputChange}
                  />
                </div>
                <PayAndRegisterButton
                  course_name={course_name}
                  amount_to_pay={amount_to_pay}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
