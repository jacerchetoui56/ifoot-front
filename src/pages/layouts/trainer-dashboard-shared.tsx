import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/context/theme-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { BsCalendar2Event } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { BsBrightnessHigh } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { useSidebarStore } from "@/services/stores/sidebar.store";
import clsx from "clsx";

export default function TrainerDashboardShared() {
  // const isDesktop = useMediaQuery("(min-width: 768px)");
  const { t } = useTranslation();
  const { changeTheme } = useThemeContext();
  const { toggle, isOpen } = useSidebarStore();

  return (
    <div className="flex h-screen flex-col">
      <header className="fixed left-0 top-0 z-10 w-full select-none border-b bg-white shadow-sm dark:bg-gray-900">
        <div className=" flex  items-center justify-between px-6 py-2">
          <div className="flex items-center gap-4">
            <div
              className="cursor-pointer select-none rounded-sm border p-1"
              onClick={() => toggle()}
            >
              <HiOutlineMenuAlt1 className="size-5 text-gray-600 hover:text-gray-700 dark:text-gray-200" />
            </div>

            <Link to="/">
              <img
                className="h-14 dark:invert dark:filter"
                alt="ifoot logo"
                src="/logo.png"
              />
            </Link>
          </div>
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <BsBrightnessHigh />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem onClick={() => changeTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <Link to="/admin/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link to="/auth/player/login">
                  <DropdownMenuItem>
                    <span className="w-full text-red-500">
                      {t("dashboard.header.logout")}
                    </span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className={clsx("flex pt-[69px]")}>
        <DashboardSidebar
          links={[
            { to: "/", name: "Link One", Icon: <BsCalendar2Event /> },
            {
              to: "/trainer/dashboard",
              name: "Link Two",
              Icon: <BsCalendar2Event />,
            },
            { to: "/", name: "Link Three", Icon: <BsCalendar2Event /> },
            { to: "/", name: "Link Four", Icon: <BsCalendar2Event /> },
          ]}
        />
        <div
          className={clsx("p-2 ", {
            "lg:ml-[0px]": !isOpen,
            "lg:ml-[240px]": isOpen,
          })}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
