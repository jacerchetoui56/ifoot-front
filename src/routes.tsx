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

  return <Suspense fallback={<div>Loading page...</div>}>{routes}</Suspense>;
}
