import CoursesList from '@/components/cources-list';
import Register from '@/components/Register';
// import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      <CoursesList />
      <Register />
    </div>
  );
}
