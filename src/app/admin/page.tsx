import { AdminDashBoard, AdminLogin } from '@/components/admin-login';

export default function Page() {
  return (
    <div className="pt-4">
      <div className="pl-[10vw] md:pt-16">
        <h3 className="text-xl font-bold text-blue-500 md:text-2xl lg:text-4xl">
          Admin DashBoard
        </h3>
      </div>
      {/* <AdminLogin /> */}
      <AdminDashBoard />
    </div>
  );
}
