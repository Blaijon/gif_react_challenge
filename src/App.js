import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Landing";
import Results from "./components/Results";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path="/" component={Landing} />
        <Route exact path="/results" component={Results} />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
