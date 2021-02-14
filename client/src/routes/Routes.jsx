import React from "react";

// Router
import { Route, Switch } from "react-router-dom";

// Components
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "@pages/NotFoundPage";
import LoginPage from "@pages/LoginPage";
import UsersPage from "@pages/admin/UsersPage";
import GroupsPage from "@pages/admin/GroupsPage";
import HomePage from "@pages/home/HomePage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/admin/users" component={UsersPage} />
      <PrivateRoute exact path="/admin/groups" component={GroupsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
