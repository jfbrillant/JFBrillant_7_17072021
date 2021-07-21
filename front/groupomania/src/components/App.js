import "../styles/App.scss";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";
import Feed from "./Feed";
import Footer from "./Footer";

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/feed" component={Feed} />
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
