import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import './styles/styles.scss';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {SearchHaystack} from "./components/search/search-haystack";
import {SearchElastics} from "./components/search/search-elastics";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <SearchElastics />
                </Route>
                <Route path="/elastics" exact={true}>
                    <SearchElastics />
                </Route>
                <Route path="/haystack" exact={true}>
                    <SearchHaystack />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
