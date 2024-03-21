import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import WelcomePageHeader from "@/components/welcome-page-header";

const validationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6),
});

export default function AdminLoginPage() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  function onSubmit(data: z.infer<typeof validationSchema>) {
    console.log("data submitted", data);
  }

  return (
    <div className="flex h-full flex-col">
      <WelcomePageHeader />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-md bg-slate-50 p-6 shadow-md dark:bg-gray-900">
          <div className="space-y-2 text-center">
            <h3 className="text-center text-4xl font-bold">
              {t("loginPage.adminTitle")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("loginPage.adminMessage")}
            </p>
          </div>
          <form className="mt-4 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                className={clsx("rounded-md p-2", {
                  "border-pink-600": errors.email,
                })}
                placeholder="john@example.com"
                id="email"
                type="email"
                required
              />
              {/* <span className="text-red-500">{errors.email?.message}</span> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className={clsx("rounded-md p-2", {
                  "border-pink-600": errors.password,
                })}
                {...register("password")}
                // placeholder="******"
                id="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="mt-4 w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
