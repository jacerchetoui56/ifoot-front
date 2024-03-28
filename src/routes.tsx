import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import NotFoundPage from "./components/not-found";
import ProtectedRoute from "./components/ProtectedRoute";

const AdminLogin = lazy(() => import("./pages/admin/admin-login.page"));
const PlayerLogin = lazy(() => import("./pages/player/player-login.page"));
const TrainerLogin = lazy(() => import("./pages/trainer/trainer-login.page"));
const WeclomePage = lazy(() => import("./pages/Welcome"));
const AdminDashboardPage = lazy(
  () => import("./pages/admin/admin-dashboard.page"),
);
const AdminDashboardShared = lazy(
  () => import("./pages/layouts/admin-dashboard-shared"),
);
const PlayerDashboardPage = lazy(
  () => import("./pages/player/player-dashboard.page"),
);
const PlayerDashboardShared = lazy(
  () => import("./pages/layouts/player-dashboard-shared"),
);
const TrainerDashboardPage = lazy(
  () => import("./pages/trainer/trainer-dashboard.page"),
);
const TrainerDashboardShared = lazy(
  () => import("./pages/layouts/trainer-dashboard-shared"),
);
const PlayerSessionsPage = lazy(
  () => import("./pages/player/player-sessions.page"),
);
const PlayerPresencePage = lazy(
  () => import("./pages/player/player-presence.page"),
);
const PlayerChatsPage = lazy(() => import("./pages/player/player-chats.page"));
const PlayerAnnualProgramPage = lazy(
  () => import("./pages/player/player-annual-program.page"),
);
const PlayerProfilePage = lazy(
  () => import("./pages/player/player-profile.page"),
);
const PlayerTeamMatesPage = lazy(
  () => import("./pages/player/player-teammates.page"),
);
const TrainerSessionsPage = lazy(
  () => import("./pages/trainer/trainer-sessions.page"),
);
const TrainerPresencePage = lazy(
  () => import("./pages/trainer/trainer-presence.page"),
);
const TrainerChatsPage = lazy(
  () => import("./pages/trainer/trainer-chats.page"),
);
const TrainerTacticsPage = lazy(
  () => import("./pages/trainer/trainer-tactics.page"),
);
const TrainerAnnualProgramPage = lazy(
  () => import("./pages/trainer/trainer-annual-program.page"),
);
const TrainerProfilePage = lazy(
  () => import("./pages/trainer/trainer-profile.page"),
);
const PlayersManagementPage = lazy(
  () => import("./pages/admin/players-management.page"),
);
const TrainersManagementPage = lazy(
  () => import("./pages/admin/trainers-management.page"),
);
const CategoriesManagementPage = lazy(
  () => import("./pages/admin/categories-management.page"),
);
const SessionsManagementPage = lazy(
  () => import("./pages/admin/sessions-management.page"),
);
const PresenceManagementPage = lazy(
  () => import("./pages/admin/presence-management.page"),
);
const ChatsManagementPage = lazy(
  () => import("./pages/admin/chats-management.page"),
);
const TacticsManagementPage = lazy(
  () => import("./pages/admin/tactics-management.page"),
);
const RolesManagementPage = lazy(
  () => import("./pages/admin/roles-management.page"),
);
const AdminsManagementPage = lazy(
  () => import("./pages/admin/admins-management.page"),
);
const AnnualProgramManagementPage = lazy(
  () => import("./pages/admin/annual-program-management.page"),
);
const AdminProfilePage = lazy(() => import("./pages/admin/admin-profile.page"));

export default function RenderedRoutes() {
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
        <ProtectedRoute requiredPermissions={["9r8s3k1m2j"]}>
          <Suspense fallback={<LoadingPageSpinner />}>
            <AdminDashboardShared />
          </Suspense>
        </ProtectedRoute>
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
        {
          path: "players",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <PlayersManagementPage />
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <AdminProfilePage />
            </Suspense>
          ),
        },
        {
          path: "trainers",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <TrainersManagementPage />
            </Suspense>
          ),
        },
        {
          path: "categories",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <CategoriesManagementPage />
            </Suspense>
          ),
        },
        {
          path: "sessions",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <SessionsManagementPage />
            </Suspense>
          ),
        },
        {
          path: "presence",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <PresenceManagementPage />
            </Suspense>
          ),
        },
        {
          path: "chats",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <ChatsManagementPage />
            </Suspense>
          ),
        },
        {
          path: "tactics",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <TacticsManagementPage />
            </Suspense>
          ),
        },
        {
          path: "roles",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <RolesManagementPage />
            </Suspense>
          ),
        },
        {
          path: "admins",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <AdminsManagementPage />
            </Suspense>
          ),
        },
        {
          path: "annual-program",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <AnnualProgramManagementPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/player/dashboard",
      element: (
        <ProtectedRoute requiredPermissions={["1n0a4g5hf5"]}>
          <Suspense fallback={<LoadingPageSpinner />}>
            <PlayerDashboardShared />
          </Suspense>
        </ProtectedRoute>
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
        {
          path: "profile",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <PlayerProfilePage />
            </Suspense>
          ),
        },
        {
          path: "sessions",
          element: (
            <Suspense fallback={<div>Custom loading for the player....</div>}>
              <PlayerSessionsPage />
            </Suspense>
          ),
        },
        {
          path: "presence",
          element: (
            <Suspense fallback={<div>Custom loading for the player....</div>}>
              <PlayerPresencePage />
            </Suspense>
          ),
        },
        {
          path: "chats",
          element: (
            <Suspense fallback={<div>Custom loading for the player....</div>}>
              <PlayerChatsPage />
            </Suspense>
          ),
        },
        {
          path: "annual-program",
          element: (
            <Suspense fallback={<div>Custom loading for the player....</div>}>
              <PlayerAnnualProgramPage />
            </Suspense>
          ),
        },
        {
          path: "teammates",
          element: (
            <Suspense fallback={<div>Custom loading for the player....</div>}>
              <PlayerTeamMatesPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/trainer/dashboard",
      element: (
        <ProtectedRoute requiredPermissions={["2o3b1m5j9f"]}>
          <Suspense fallback={<LoadingPageSpinner />}>
            <TrainerDashboardShared />
          </Suspense>
        </ProtectedRoute>
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
        {
          path: "profile",
          element: (
            <Suspense fallback={<div>Custom loading for the admin....</div>}>
              <TrainerProfilePage />
            </Suspense>
          ),
        },
        {
          path: "sessions",
          element: (
            <Suspense fallback={<div>Custom loading for the trainer...</div>}>
              <TrainerSessionsPage />
            </Suspense>
          ),
        },
        {
          path: "presence",
          element: (
            <Suspense fallback={<div>Custom loading for the trainer...</div>}>
              <TrainerPresencePage />
            </Suspense>
          ),
        },
        {
          path: "chats",
          element: (
            <Suspense fallback={<div>Custom loading for the trainer...</div>}>
              <TrainerChatsPage />
            </Suspense>
          ),
        },
        {
          path: "tactics",
          element: (
            <Suspense fallback={<div>Custom loading for the trainer...</div>}>
              <TrainerTacticsPage />
            </Suspense>
          ),
        },
        {
          path: "annual-program",
          element: (
            <Suspense fallback={<div>Custom loading for the trainer...</div>}>
              <TrainerAnnualProgramPage />
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

export function LoadingPageSpinner() {
  return (
    <div className="dark:[rgba(222.2 84% 4.9%)] fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-90">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  );
}
