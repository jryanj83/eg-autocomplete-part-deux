import AddressLookupWrapper from "@/section/address-lookup/address-lookup-wrapper";
import type { UserData } from "@/section/address-lookup/types";

// Mark this route as dynamic to avoid stale data
export const dynamic = 'force-dynamic';

async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      cache: 'no-store', // Force the data to be fetched fresh from the server
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while fetching user data'
    );
  }
}

export default async function Home() {
  const userData: UserData[] = await getUsers();
  
  if (!userData?.length) {
    throw new Error('No user data available');
  }
  
  return <AddressLookupWrapper initialData={userData} />;
}
