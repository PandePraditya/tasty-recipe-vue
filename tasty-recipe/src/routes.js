import HomePage from "./components/pages/HomePage.vue"
import LoginPage from "./components/pages/LoginPage.vue"
import SignupPage from "./components/pages/SignupPage.vue"
import DetailPage from "./components/pages/DetailPage.vue"
import UserPage from "./components/pages/UserPage.vue"
import cookies from "js-cookie";
import { store } from "./store/index";

const checkAuth = () => {
    const jwtCookie = cookies.get("jwt");
    const expirationDate = cookies.get("tokenExpirationDate");
    const userId = cookies.get("UID");

    if (jwtCookie) {
        if(new Date().getTime() < +expirationDate) {
            store.commit("auth/setToken", {
                idToken: jwtCookie,
                expiresIn: expirationDate,
            });
            store.dispatch("auth/getUser", userId);
            return true;
        } else {
            store.commit("auth/setUserLogout");
            return false;
        }
    } else {
        return false;
    }
};

export const routes = [
    { 
        path: "/", 
        name: "homePage", 
        component: HomePage,
        beforeEnter: () => {
            checkAuth();
        }, 
    },
    { path: "/login", name: "login", component: LoginPage },
    { path: "/signup", name: "signup", component: SignupPage },
    { path: "/recipe/:id", name: "detailPage", component: DetailPage },
    { 
        path: "/user/:component", 
        name: "userPage", 
        component: UserPage,
        beforeEnter: (tp, from, next) => {
            checkAuth() ? next() : next({ name: "login" }); // redirect to login if not authenticated
        },
    },
]