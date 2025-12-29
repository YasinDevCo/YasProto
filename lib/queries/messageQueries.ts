// lib/queries/messageQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useMessagesQuery = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch("/api/contact");
      if (!res.ok) {
        throw new Error("خطا در دریافت پیام‌ها");
      }
      const data = await res.json();
      // API ما { data: [...], total: ... } برمی‌گردونه
      return data.data || [];
    },
    staleTime: 1000 * 60 * 1, // ۱ دقیقه کش
  });
};

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("خطا در علامت‌گذاری پیام");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export const useDeleteMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در حذف پیام");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error: Error) => {
      alert(error.message || "خطا در حذف پیام");
    },
  });
};