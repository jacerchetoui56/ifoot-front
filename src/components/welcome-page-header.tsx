import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { CiLight } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
import { Link } from "react-router-dom";
import i18n from "../i18n";
import { useThemeContext } from "@/context/theme-context";

export default function WelcomePageHeader() {
  const { t } = useTranslation();
  const { changeTheme } = useThemeContext();
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };
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
        {/* <div className="flex gap-4">
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
        </div> */}
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                {t("welcomepage.header.identify")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>
                French
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <CiLight />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
