import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import NotFoundPage from "./components/not-found";

export default function RenderedRoutes() {
  const AdminLogin = lazy(() => import("./pages/admin-login"));
  const PlayerLogin = lazy(() => import("./pages/player-login"));
  const TrainerLogin = lazy(() => import("./pages/trainer-login"));
  const WeclomePage = lazy(() => import("./pages/Welcome"));

  const routes = useRoutes([
    {
      path: "/",
      element: <WeclomePage />,
    },
    {
      path: "/auth",
      children: [
        {
          path: "admin/login",
          element: <AdminLogin />,
        },
        {
          path: "player/login",
          element: <PlayerLogin />,
        },
        {
          path: "trainer/login",
          element: <TrainerLogin />,
        },
      ],
    },

    // others
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <Suspense fallback={<LoadingPageSpinner />}>{routes}</Suspense>;
}

function LoadingPageSpinner() {
  return (
    <div className="dark:[rgba(222.2 84% 4.9%)] fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-90">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  );
}
