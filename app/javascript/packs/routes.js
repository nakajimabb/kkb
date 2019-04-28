import KkbList from "./KkbList.js";
import UserList from "./UserList.js";
import GroupList from "./GroupList.js";


var routes = [
  {
    path: "/kkbs",
    name: "Kkb list",
    component: KkbList,
  },
  {
    path: "/users",
    name: "User list",
    component: UserList,
  },
  {
    path: "/groups",
    name: "Group list",
    component: GroupList,
  }
];

export default routes;
