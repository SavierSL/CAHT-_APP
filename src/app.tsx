import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./components/Chat/chat";
import JoinChat from "./components/Join/join";

const App = () => (
  <Router>
    <Route path="/" exact component={JoinChat} />
    <Route path="/chat" exact component={Chat} />
  </Router>
);

export default App;
