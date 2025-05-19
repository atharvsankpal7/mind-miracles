import { ProgramInfo } from '@/components/7-days-program/ProgramInfo';
import { VideoPreview } from '@/components/7-days-program/VideoPreview';
import { Hero } from '@/components/7-days-program/Hero';
import { TermsAndConditions } from '@/components/7-days-program/TermsAndConditions';
import { FeeInfo } from '@/components/common/fee-info';
import { ProgramRegistrationForm } from '@/components/common/program-registration';
import { courses } from '@/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth_options';
import { redirect } from 'next/navigation';
import prisma from '@/db';

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (session?.user) {
    // Check if user has already purchased the course
    const course = await prisma.course.findFirst({
      where: {
        userId: session.user.id,
        name: "7 Days Program"
      }
    });

    if (course) {
      redirect(`/courses/${course.id}`);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      <Hero />
      <ProgramInfo />
      <VideoPreview videolink="https://www.youtube.com/embed/v0cTo4eGAOM?si=ADoHRITZoxuHZAxK" />
      <FeeInfo feeAmount={1499} />
      <ProgramRegistrationForm
        course_name={courses['seven-day-program']}
        amount_to_pay={1499}
      />
      <TermsAndConditions />
    </div>
  );
}