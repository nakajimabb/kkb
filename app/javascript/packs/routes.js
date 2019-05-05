import KkbList from "./kkbs/KkbList.js";
import KkbShow from "./kkbs/KkbShow.js";
import UserList from "./UserList.js";
import GroupList from "./GroupList.js";


var routes = [
  { path: "/kkbs", component: KkbList },
  { path: "/kkbs/:id", component: KkbShow },
  { path: "/users", component: UserList },
  { path: "/groups", component: GroupList },
];

export default routes;
