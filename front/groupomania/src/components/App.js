import "../styles/App.scss";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";
import Feed from "./Feed";
import OnePost from "../containers/OnePost";
import Footer from "./Footer";

function App() {

  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>
          <Header />
          <Switch>
            <ProtectedRoute path="/" exact component={Feed} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <ProtectedRoute path="/feed" component={Feed} />
            <ProtectedRoute exact path="/post/:id" component={OnePost} />
            <Route
              path="/"
              component={() => <div>Oups... La page n'existe pas !</div>}
            />
          </Switch>
          <Footer />
        </Router>
      </React.Fragment>
    </Provider>
  );
}

export default App;
