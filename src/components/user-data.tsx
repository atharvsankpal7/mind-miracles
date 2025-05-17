import { DataTable } from '@/components/userDataTable';

export const UserDataTable = ({ data }: { data: any }) => {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <DataTable
          data={data?.personalcounselling}
          table_name="Personal Counselling Patient List"
        />
        <DataTable
          data={data?.sevendayprogram}
          table_name="7 Day Program List"
        />
        <DataTable data={data?.register} table_name="Contact User List" />
      </div>
    </>
  );
};
