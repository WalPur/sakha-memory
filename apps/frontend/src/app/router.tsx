import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "@/shared/constants";
import Layout from "@/shared/ui/Layout";
import { MainPage, PagePage, SearchPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Ошибка</div>,
    children: [
      {
        path: ROUTES.MAIN,
        element: <MainPage />,
      },
      {
        path: ROUTES.PAGE + "/:id",
        element: <PagePage />,
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
