import WelcomePageHeader from "@/components/welcome-page-header";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function WeclomePage() {
  const { t } = useTranslation();
  const weclomePageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    weclomePageRef.current?.appendChild(cursor);

    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    return () => {
      document.removeEventListener("mousemove", function () {});
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <WelcomePageHeader />
      <div ref={weclomePageRef} className="welcome-page flex h-full flex-col">
        <main className="flex flex-1 items-center justify-center font-mulish font-medium">
          <div className="-translate-y-10 p-2 md:-translate-y-0 md:p-0">
            <div className="mb-5 text-center text-5xl font-bold md:text-6xl 2xl:text-7xl">
              {t("welcomepage.welcome.title")}
            </div>
            <p className="text-md text-center md:text-lg ">
              {t("welcomepage.welcome.description")}
            </p>
          </div>
        </main>
        <ul className="fixed left-0 top-0 -z-10 m-0 h-[100vh] w-[100vw] overflow-hidden p-0 blur-3xl filter">
          <li className="fixed left-1/2 top-1/2 block h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2  list-none bg-blue-200 opacity-70 dark:opacity-20"></li>
        </ul>
      </div>
    </div>
  );
}
