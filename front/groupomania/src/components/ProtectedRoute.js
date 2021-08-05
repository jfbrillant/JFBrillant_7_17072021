import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const isLogin = localStorage.getItem("isLogin");
  const userData = localStorage.getItem("userData");
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogin === "true" && userData) {
          return <Component {...rest} {...props} />;
        } else {
          localStorage.removeItem("isLogin");
          localStorage.removeItem("userData");
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
