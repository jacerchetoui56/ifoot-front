import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { CiLight } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useThemeContext } from "@/context/theme-context";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export default function WelcomePageHeader() {
  const { t } = useTranslation();
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const { changeTheme } = useThemeContext();
  return (
    <header className="w-full shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <Link to="/">
          <img
            className="h-14 dark:invert dark:filter"
            alt="ifoot logo"
            src="/logo.png"
          />
        </Link>
        <div className="hidden gap-4 md:flex">
          <Link
            className="mx-2 font-medium text-blue-900 hover:underline dark:text-gray-300"
            to="/auth/admin/login"
          >
            {t("welcomepage.header.adminLink")}
          </Link>
          <Link
            className="mx-2 font-medium text-blue-900 hover:underline dark:text-gray-300"
            to="/auth/player/login"
          >
            {t("welcomepage.header.playerLink")}
          </Link>
          <Link
            className="mx-2 font-medium text-blue-900 hover:underline dark:text-gray-300"
            to="/auth/trainer/login"
          >
            {t("welcomepage.header.trainerLink")}
          </Link>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden">
              <Button variant="ghost">
                {t("welcomepage.header.identify")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>
                <Link to="/auth/admin/login">
                  {t("welcomepage.header.adminLink")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/auth/trainer/login">
                  {t("welcomepage.header.trainerLink")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/auth/player/login">
                  {t("welcomepage.header.playerLink")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <HiLanguage />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                {t("general.english")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>
                {t("general.french")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <CiLight />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem onClick={() => changeTheme("light")}>
                {t("general.light")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeTheme("dark")}>
                {t("general.dark")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
