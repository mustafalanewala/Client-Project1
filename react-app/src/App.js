import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Login} />
        
        {/* Protected Routes */}
        <ProtectedRoute path="/read" exact component={Read} />
        <ProtectedRoute path="/create" exact component={Create} />
        <ProtectedRoute path="/update/:id" exact component={Update} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
