import Login from "./auth/Login";
import Register from "./auth/Register";
import UserFriends from "./Friends/UserFriends";
import UserFriendsRequests from "./Friends/UserFriendsRequests";
import LandingPage from "./LandingPage";
import UserProfile from "./Profile/UserProfile";

const routes = [
    {path:"/register", component: Register},
    {path:"/login", component: Login},
    {path:"/profile/:id", component:UserProfile},
    {path:"friends/:email",component:UserFriends},
    {path:"friends/:email/requests",component:UserFriendsRequests},
    {path:"/", component: LandingPage},
    {path:"*" ,component: LandingPage}
];

export default routes;