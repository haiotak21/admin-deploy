import { useQuery } from '@tanstack/react-query';

async function fetchEngagement(periodDays: number) {
  const res = await fetch(`/api/analytics/engagement?period=${periodDays}`);
  if (!res.ok) throw new Error('Failed to fetch engagement');
  return res.json();
}

async function fetchSubjects(limit: number) {
  const res = await fetch(`/api/analytics/subjects?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch subjects');
  return res.json();
}

export const useEngagement = (periodDays: number = 30) => {
  return useQuery({
    queryKey: ['analytics', 'engagement', periodDays],
    queryFn: () => fetchEngagement(periodDays),
  });
};

export const usePopularSubjects = (limit: number = 5) => {
  return useQuery({
    queryKey: ['analytics', 'subjects', limit],
    queryFn: () => fetchSubjects(limit),
  });
};