import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WelcomePageHeader from "@/components/welcome-page-header";
import { useAuth } from "@/context/auth-context";
import { Axios } from "@/helpers/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function AdminLoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const validationSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t("loginPage.errors.invalidEmail")),
        password: z.string().min(6, t("loginPage.errors.shortPassword")),
      }),
    [t],
  );
  const { register, handleSubmit } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const { login } = useAuth();

  async function onSubmit(form: z.infer<typeof validationSchema>) {
    try {
      const { data } = await Axios.post("/auth/admin/login", {
        email: form.email,
        password: form.password,
      });
      login(data.user, data.access_token, data.refresh_token);
      console.log("data", data);
      navigate("/admin/dashboard");
    } catch (e) {
      console.log("error: ", e);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <WelcomePageHeader />
      <div className="flex flex-1 items-center justify-center ">
        <div className="w-full max-w-md -translate-y-10 rounded-md bg-slate-50 p-6 shadow-md dark:bg-gray-900">
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
                className={clsx("rounded-md p-2")}
                placeholder="john@example.com"
                id="email"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className={clsx("rounded-md p-2")}
                {...register("password")}
                // placeholder="******"
                id="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="mt-4 w-full">
              {/* <Link to="/admin/dashboard"> */}
              {t("loginPage.login")}
              {/* </Link> */}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
