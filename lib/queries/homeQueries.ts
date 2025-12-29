import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Home } from "@/lib/data/mock-data";

export const useHomeQuery = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: async (): Promise<Home> => {
      const res = await fetch("/api/home");

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("داده صفحه اصلی هنوز تنظیم نشده است.");
        }
        throw new Error("خطا در دریافت اطلاعات صفحه اصلی");
      }

      const data = await res.json();
      return data; 
    },
    staleTime: 1000 * 60 * 5, 
  });
};

export const useUpdateHome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: Partial<Home>) => {
      const res = await fetch("/api/home", {
        method: "PUT",
        credentials: "include", // برای ارسال کوکی توکن
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 401) {
          throw new Error("برای ویرایش باید لاگین کرده باشی.");
        }
        throw new Error(errorData.error || "خطا در ذخیره تغییرات صفحه اصلی");
      }

      const data = await res.json();
      return data.home; // معمولاً home آپدیت‌شده رو برمی‌گردونیم
    },
    onSuccess: (newHomeData) => {
      // کش رو آپدیت کن تا UI فوری تغییر کنه
      queryClient.setQueryData(["home"], newHomeData);

      // یا اگر بخوای دوباره از سرور بگیری:
      // queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};