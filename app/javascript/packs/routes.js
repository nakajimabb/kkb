import KkbList from "./kkbs/KkbList.js";
import UserList from "./UserList.js";
import GroupList from "./GroupList.js";


var routes = [
  {
    path: "/kkb_list",
    name: "すべての板",
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
