import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import CreateLocationPage from "../Pages/CreateLocationPage/CreateLocationPage";
import LocationListPage from "../Pages/LocationListPage/LocationListPage";
import CreateDeskPage from "../Pages/CreateDeskPage/CreateDeskPage";
import DeskListPage from "../Pages/DeskListPage/DeskListPage";
import CreateReservationPage from "../Pages/CreateReservationPage/CreateReservationPage";
import UpdateDeskPage from "../Pages/UpdateDeskPage/UpdateDeskPage";
import ReservationListPage from "../Pages/ReservationListPage/ReservationListPage";
import UpdateUsersReservationPage from "../Pages/UpdateUsersReservationPage/UpdateUsersReservationPage";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage/>},
            {path: "login", element: <LoginPage/>},
            {path: "register", element: <RegisterPage/>},
            {path: "create-reservation", element: <ProtectedRoute><CreateReservationPage/></ProtectedRoute>},
            {path: "reservations", element: <ProtectedAdminRoute><ReservationListPage/></ProtectedAdminRoute>},
            {path: "user-reservations", element: <ProtectedRoute><UpdateUsersReservationPage/></ProtectedRoute>},
            {path: "create-location", element: <ProtectedAdminRoute><CreateLocationPage/> </ProtectedAdminRoute>},
            {path: "locations", element: <ProtectedRoute><LocationListPage/></ProtectedRoute>},
            {path: "create-desk", element: <ProtectedAdminRoute><CreateDeskPage/></ProtectedAdminRoute>},
            {path: "desks", element: <ProtectedRoute><DeskListPage/></ProtectedRoute>},
            {path: "update-desk", element: <ProtectedAdminRoute><UpdateDeskPage/></ProtectedAdminRoute>},
        ]
    }
])