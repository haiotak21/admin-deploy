"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchTrends(type: "user" | "revenue") {
  const res = await fetch(`/api/dashboard/trends?type=${type}`);
  if (!res.ok) throw new Error("Failed to fetch trends");
  return res.json();
}

export const useTrends = (type: "user" | "revenue") => {
  return useQuery({
    queryKey: ["trends", type],
    queryFn: () => fetchTrends(type),
    select: (data) =>
      data.map((item: any) => ({
        month: item.month,
        [type === "user" ? "count" : "revenue"]:
          type === "user" ? item.count : item.revenue,
      })),
  });
};
