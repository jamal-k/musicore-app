/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
import Profile from "views/Profile.jsx";
import Register from "views/Register.jsx";
import Login from "views/Login.jsx";
import About from "views/About.jsx";
import Details from "views/Details.jsx";
import Leads from "views/Leads.jsx";
import AddData from "views/AddData.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/leads",
    name: "Lead Data",
    icon: "fas fa-search text-blue",
    component: Leads,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "fas fa-search text-blue",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/adddata",
    name: "Add Lead",
    icon: "ni ni-fat-add text-green",
    component: AddData,
    layout: "/admin"
  },
  {
    path: "/about",
    name: "About",
    icon: "ni ni-world-2 text-yellow",
    component: About,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  
  {
    path: "/details",
    name: "Details",
    icon: "ni ni-circle-08 text-pink",
    component: Details,
    layout: "/admin"
  }

];
export default routes;