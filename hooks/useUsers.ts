"use client";

import { useQuery } from "@tanstack/react-query";
import { UserStatsResponse, UsersListResponse, UserRole } from "@/types/users";

export const useUserStats = () => {
  return useQuery<UserStatsResponse, Error>({
    queryKey: ["users", "stats"],
    queryFn: async () => {
      const response = await fetch("/api/users/stats");
      if (!response.ok) throw new Error("Failed to fetch user stats");
      return response.json();
    },
  });
};

export const useUsersList = (role: UserRole, page: number, search: string) => {
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);

  return useQuery<UsersListResponse, Error>({
    queryKey: ["users", "list", role, page, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        role: capitalizedRole,
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
      });

      const response = await fetch(`/api/users?${params}`);
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
  });
};
