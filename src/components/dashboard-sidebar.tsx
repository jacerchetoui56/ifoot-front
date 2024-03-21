import { useSidebarStore } from "@/services/stores/sidebar.store";
import clsx from "clsx";
import CNavLink, { LinkType } from "./active-link";

type Props = {
  links: LinkType[];
};

export default function DashboardSidebar({ links }: Props) {
  const { isOpen } = useSidebarStore();
  return (
    <div
      className={clsx(
        "fixed left-0 top-[69px] h-screen w-[240px] shrink-0 overflow-y-auto overflow-x-hidden bg-white shadow-xl transition-all dark:bg-gray-900 lg:shadow-lg",
        { "-translate-x-full shadow-none lg:w-0": !isOpen },
      )}
    >
      <aside className="space-y-1">
        {links.map((link) => (
          <CNavLink
            key={link.to}
            to={link.to}
            name={link.name}
            Icon={link.Icon}
          />
        ))}
      </aside>
    </div>
  );
}
