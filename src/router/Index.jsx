import {
    createBrowserRouter,
} from "react-router-dom";

import Home from "../views/Home";
import Albuns from "../views/Albuns"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/edit",
        element: <Albuns />
    }
])

export default router;