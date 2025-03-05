import dynamic from "next/dynamic";

const UsersList = dynamic(() => import('@/components/users/users-list'));

function page() {
  return (
    <UsersList />
  );
}

export default page;
