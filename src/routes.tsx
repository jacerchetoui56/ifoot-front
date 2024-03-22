import { Suspense, lazy, useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import NotFoundPage from "./components/not-found";
import { useAuth } from "./context/auth-context";

export default function RenderedRoutes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      if (pathname.startsWith("/admin")) {
        navigate("/auth/admin/login", { replace: true });
      } else if (pathname.startsWith("/player")) {
        navigate("/auth/player/login", { replace: true });
      } else if (pathname.startsWith("/trainer")) {
        navigate("/auth/trainer/login", { replace: true });
      }
    } else if (isAuthenticated && user) {
      if (user?.permissions?.includes("2o3b1m5j9f")) {
        navigate("/trainer/dashboard");
      } else if (user?.permissions.includes("1n0a4g5hf5")) {
        navigate("/player/dashboard");
      } else if (user?.permissions?.includes("9r8s3k1m2j")) {
        navigate("/admin/dashboard");
      }
    }
  }, [pathname, user, isAuthenticated, navigate]);

  const AdminLogin = lazy(() => import("./pages/admin-login"));
  const PlayerLogin = lazy(() => import("./pages/player-login"));
  const TrainerLogin = lazy(() => import("./pages/trainer-login"));
  const WeclomePage = lazy(() => import("./pages/Welcome"));
  const AdminDashboardPage = lazy(() => import("./pages/admin-dashboard"));
  const AdminDashboardShared = lazy(
    () => import("./pages/layouts/admin-dashboard-shared"),
  );
  const PlayerDashboardPage = lazy(() => import("./pages/player-dashboard"));
  const PlayerDashboardShared = lazy(
    () => import("./pages/layouts/player-dashboard-shared"),
  );
  const TrainerDashboardPage = lazy(() => import("./pages/trainer-dashboard"));
  const TrainerDashboardShared = lazy(
    () => import("./pages/layouts/trainer-dashboard-shared"),
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
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <AdminDashboardPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/player/dashboard",
      element: (
        <Suspense fallback={<LoadingPageSpinner />}>
          <PlayerDashboardShared />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div>Custom loading for the player....</div>}>
              <PlayerDashboardPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/trainer/dashboard",
      element: (
        <Suspense fallback={<LoadingPageSpinner />}>
          <TrainerDashboardShared />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div>Custom loading for the trainer...</div>}>
              <TrainerDashboardPage />
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
