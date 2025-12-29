// lib/queries/projectQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "../data/mock-data";


export const useUploadImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در آپلود تصویر");
      }

      return res.json();
    },
    onSuccess: () => {
      // اختیاری: اگر بخوای کشی invalidate کنی
    },
  });
};

// نوع داده پروژه بر اساس مدل MongoDB
// type Project = {
//   _id: string;
//   title: string;
//   description: string;
//   image: string;
//   technologies: string[];
//   demoUrl?: string;
//   githubUrl?: string;
//   category: "فروشگاه" | "داشبورد" | "اپلیکیشن" | "وبلاگ" | "لندینگ" | "سایر";
//   featured: boolean;
//   createdAt: string;
//   updatedAt: string;
// };

// ۱. دریافت همه پروژه‌ها (با پشتیبانی از فیلتر category و featured)
export const useProjectsQuery = (filters?: {
  category?: string;
  featured?: boolean;
}) => {
  return useQuery({
    queryKey: ["projects", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.append("category", filters.category);
      if (filters?.featured !== undefined) params.append("featured", "true");

      const url = `/api/projects${params.toString() ? `?${params.toString()}` : ""}`;

      const res = await fetch(url, {
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در دریافت پروژه‌ها");
      }

      return res.json() as Promise<Project[]>;
    },
  });
};

// ۲. افزودن پروژه جدید (فقط ادمین)
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProject: {
      title: string;
      description: string;
      image: string;
      technologies: string[];
      demoUrl?: string;
      githubUrl?: string;
      category: "فروشگاه" | "داشبورد" | "اپلیکیشن" | "وبلاگ" | "لندینگ" | "سایر";
      featured?: boolean;
    }) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در افزودن پروژه");
      }

      return res.json() as Promise<Project>;
    },
    onSuccess: () => {
      // invalidate همه queryهای مرتبط با پروژه‌ها
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// ۳. ویرایش پروژه (فقط ادمین)
export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedProject: {
      id: string;
      title?: string;
      description?: string;
      image?: string;
      technologies?: string[];
      demoUrl?: string;
      githubUrl?: string;
      category?: "فروشگاه" | "داشبورد" | "اپلیکیشن" | "وبلاگ" | "لندینگ" | "سایر";
      featured?: boolean;
    }) => {
      const { id, ...updates } = updatedProject;

      const res = await fetch("/api/projects", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در ویرایش پروژه");
      }

      return res.json() as Promise<Project>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// ۴. حذف پروژه (فقط ادمین)
export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در حذف پروژه");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};