import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Profile } from "../data/mock-data";

// GET: دریافت پروفایل کاربر لاگین‌شده
export const useProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile", {
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          // window.location.href = "/admin/login";
          throw new Error("unauthorized");
        }
        throw new Error("خطا در دریافت اطلاعات پروفایل");
      }
      const data = await res.json();
      return data.profile;
    },
  });
};

// PUT: آپدیت پروفایل
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedData: Partial<Profile>) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "خطا در ذخیره");
      }

      return res.json();
    },
    onSuccess: () => {
      // بعد از آپدیت موفق، کش پروفایل رو آپدیت کن
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
