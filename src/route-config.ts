import Login from "./auth/Login";
import Register from "./auth/Register";
import LandingPage from "./LandingPage";

const routes = [
    {path:"/register", component: Register},
    {path:"/login", component: Login},

    {path:"/", component: LandingPage},
    {path:"*" ,component: LandingPage}
];
export default routes;