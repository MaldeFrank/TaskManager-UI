import { createBrowserRouter, RouteObject } from "react-router-dom";
import TabView from "../components/TabView";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <TabView />,
  },
];

const router = createBrowserRouter(routes);

export default router;