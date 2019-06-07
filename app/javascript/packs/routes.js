import KkbList from "./kkbs/KkbList.js";
import KkbShow from "./kkbs/KkbShow.js";
import UserList from "./users/UserList.js";
import UserNew from "./users/UserNew.js";
import UserEdit from "./users/UserEdit.js";
import GroupList from "./groups/GroupList.js";
import GroupNew from "./groups/GroupNew.js";
import GroupEdit from "./groups/GroupEdit.js";


var routes = [
  { path: "/kkbs", component: KkbList },
  { path: "/kkbs/:id", component: KkbShow },
  { path: "/users", component: UserList },
  { path: "/users/:id/edit", component: UserEdit },
  { path: "/users/new", component: UserNew },
  { path: "/groups", component: GroupList },
  { path: "/groups/:id/edit", component: GroupEdit },
  { path: "/groups/new", component: GroupNew },
];

export default routes;
