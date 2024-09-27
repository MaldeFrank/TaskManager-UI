import { createBrowserRouter, RouteObject } from "react-router-dom";
import TabView from "../components/SideBar";
import CreateTask from "../pages/CreateTask";
import Tasks from "../pages/Tasks";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <TabView />,
  },
];

const router = createBrowserRouter(routes);

export default router;