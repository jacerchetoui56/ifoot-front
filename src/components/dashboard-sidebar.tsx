import { useSidebarStore } from "@/services/stores/sidebar.store";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";
import CNavLink, { LinkType } from "./active-link";

type Props = {
  links: LinkType[];
};

export default function DashboardSidebar({ links }: Props) {
  const { isOpen, closeSidebar, openSidebar } = useSidebarStore();

  const { pathname } = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!isDesktop && isOpen) {
      closeSidebar();
    } else if (isDesktop && !isOpen) {
      openSidebar();
    }
  }, [pathname, isDesktop]);

  const ref = useRef(null);

  useOnClickOutside(ref, (event) => {
    // if the element contains class exclude-dashboard-sidebar, don't close the sidebar
    if (
      (event.target as HTMLElement).classList.contains(
        "exclude-dashboard-sidebar",
      )
    ) {
      return;
    }
    if (!isDesktop && isOpen) {
      closeSidebar();
    }
  });

  return (
    <div
      ref={ref}
      className={clsx(
        "fixed left-0 top-[69px] h-screen w-[240px] shrink-0 overflow-y-auto overflow-x-hidden border-r bg-white shadow-xl transition-all dark:bg-gray-900 lg:shadow-lg",
        { "-translate-x-full shadow-none lg:w-0": !isOpen },
      )}
    >
      <aside className="space-y-1">
        {links.map((link) => (
          <CNavLink
            key={link.name}
            to={link.to}
            name={link.name}
            Icon={link.Icon}
          />
        ))}
      </aside>
    </div>
  );
}
