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
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export function ProgramRegistrationForm({
  course_name,
  amount_to_pay,
}: {
  course_name: courses;
  amount_to_pay: number;
}) {
  const [formState, setFormState] = useRecoilState(registrationFormStateAtom);
  const { data: session } = useSession();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formState.name || !formState.email || !formState.whatsapp || !formState.age) {
      toast.error('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (!session) {
      toast.error('Please sign in to continue');
      signIn('google');
      return;
    }

    if (!validateForm()) {
      return;
    }
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
                {session ? (
                  <PayAndRegisterButton
                    course_name={course_name}
                    amount_to_pay={amount_to_pay}
                    onBeforePayment={validateForm}
                  />
                ) : (
                  <Button
                    onClick={() => signIn('google')}
                    className="w-full bg-green-700 hover:bg-[#3a5a40]"
                  >
                    Sign in to Continue
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}