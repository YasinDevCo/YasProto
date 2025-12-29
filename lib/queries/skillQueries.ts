// lib/queries/skillQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useSkillsQuery = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await fetch("/api/skills", {
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در دریافت مهارت‌ها");
      }
      return res.json();
    },
  });
};

// همان فایل یا جداگانه
export const useCreateSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSkill: {
      name: string;
      level: number;
      icon: string;
      category: "frontend" | "backend" | "tools";
    }) => {
      const res = await fetch("/api/skills", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در افزودن مهارت");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      name?: string;
      level?: number;
      icon?: string;
      category?: "frontend" | "backend" | "tools";
    }) => {
      const res = await fetch("/api/skills", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در ویرایش مهارت");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useDeleteSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/skills?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در حذف مهارت");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};