import { NavLink } from "react-router-dom";
import clsx from "clsx";

export type LinkType = {
  to: string;
  name: string;
  Icon?: React.ReactNode;
};

export default function CNavLink({ to, name, Icon }: LinkType) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "block text-nowrap p-2 px-4 text-gray-600 hover:bg-slate-50 hover:text-gray-800 dark:text-gray-200 dark:hover:bg-slate-800",
          {
            "bg-slate-100 font-semibold hover:bg-slate-100 dark:bg-gray-800 dark:text-gray-200":
              isActive,
            "font-normal": !isActive,
          },
        )
      }
    >
      <div className="flex items-center gap-3">
        {Icon ? Icon : <span>L</span>}
        {name}
      </div>
    </NavLink>
  );
}
