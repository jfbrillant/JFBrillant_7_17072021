import "../styles/App.scss";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";
import Feed from "../containers/Feed";
import Profil from "../containers/Profil";
import OnePost from "../containers/OnePost";
import Footer from "./Footer";

function App() {

  return (
    <Provider store={store}>
      <div className="flex-wrapper">
        <Router>
          <Header />
          <Switch>
            <ProtectedRoute path="/" exact component={Feed} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <ProtectedRoute path="/feed" component={Feed} />
            <ProtectedRoute exact path="/post/:id" component={OnePost} />
            <ProtectedRoute exact path="/profil/:id" component={Profil} />
            <Route
              path="/"
              component={() => <main>Oups... La page n'existe pas !</main>}
            />
          </Switch>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
