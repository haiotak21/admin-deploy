import { useQuery } from '@tanstack/react-query';

type UserRole = 'student' | 'teacher';

async function fetchUserGrowth() {
  const res = await fetch('/api/users/growth');
  if (!res.ok) throw new Error('Failed to fetch user growth');
  return res.json();
}

async function fetchUsers(role: UserRole) {
  const res = await fetch(`/api/users?role=${role}`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export const useUserGrowth = () => {
  return useQuery({
    queryKey: ['users', 'growth'],
    queryFn: fetchUserGrowth,
  });
};

export const useUsers = (role: UserRole) => {
  return useQuery({
    queryKey: ['users', role],
    queryFn: () => fetchUsers(role),
  });
};