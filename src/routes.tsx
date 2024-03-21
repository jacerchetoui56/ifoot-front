import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import NotFoundPage from "./components/not-found";

export default function RenderedRoutes() {
  const AdminLogin = lazy(() => import("./pages/admin-login"));
  const PlayerLogin = lazy(() => import("./pages/player-login"));
  const TrainerLogin = lazy(() => import("./pages/trainer-login"));
  const WeclomePage = lazy(() => import("./pages/Welcome"));
  const AdminDashboardPage = lazy(() => import("./pages/admin-dashboard"));
  const AdminDashboardShared = lazy(
    () => import("./pages/layouts/admin-dashboard-shared"),
  );

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingPageSpinner />}>
          <WeclomePage />,
        </Suspense>
      ),
    },
    {
      path: "/auth",
      children: [
        {
          path: "admin/login",
          element: (
            <Suspense fallback={<LoadingPageSpinner />}>
              <AdminLogin />,
            </Suspense>
          ),
        },
        {
          path: "player/login",
          element: (
            <Suspense fallback={<LoadingPageSpinner />}>
              <PlayerLogin />,
            </Suspense>
          ),
        },
        {
          path: "trainer/login",
          element: (
            <Suspense fallback={<LoadingPageSpinner />}>
              <TrainerLogin />
            </Suspense>
          ),
        },
      ],
    },

    {
      path: "/admin/dashboard",
      element: (
        <Suspense fallback={<LoadingPageSpinner />}>
          <AdminDashboardShared />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense
              fallback={<div>Custom loading for the admin.........</div>}
            >
              <AdminDashboardPage />
            </Suspense>
          ),
        },
      ],
    },

    // others
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <>{routes}</>;
}

function LoadingPageSpinner() {
  return (
    <div className="dark:[rgba(222.2 84% 4.9%)] fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-90">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  );
}
