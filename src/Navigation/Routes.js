import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ChatPage from "../Pages/ChatPage/ChatPage";
import HomePage, { user } from "../Pages/HomePage/HomePage";

let DataRoute = ({ children, ...res }) => {
  return (
    <Route
      {...res}
      render={() => {
        return !user ? <Redirect to="/" /> : children;
      }}
    ></Route>
  );
};
function Routes() {
  return (
    <>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <DataRoute exact={true} path="/chat">
          <ChatPage />
        </DataRoute>
        <Route component={HomePage} />
      </Switch>
    </>
  );
}

export default Routes;
