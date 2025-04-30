import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../login/Login";
import AdminDashboard from "../admindashboard/AdminDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Login/>
            },
            {
                path: "/admindashboard",
                element: <AdminDashboard/>
            }
        ]
    }
])

export default router;