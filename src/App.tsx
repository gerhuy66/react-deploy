import React, {useState} from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import './styles/styles.scss';
import 'font-awesome/css/font-awesome.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {SearchHaystack} from "./components/search/search-haystack";
import {SearchElastics} from "./components/search/search-elastics";
import {Menu} from "antd";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {FileTwoTone, FrownOutlined, HeartTwoTone, SmileOutlined, SmileTwoTone} from "@ant-design/icons";
import {SearchDocument} from "./components/search/search-document";

function App() {
    const [stateMenu, setStateMenu] = useState('elastic')

    const setActiveMenu = (key: string) => {
        setStateMenu(key)
    }
    const menu = () => {
        return (
            <Menu selectedKeys={[stateMenu]} mode="horizontal" className="menu">
                <Menu.Item key="elastic" icon={<SmileTwoTone/>}>
                    <Link to={'/elastic'}>
                        Feature Search
                    </Link>
                </Menu.Item>

                <Menu.Item key="haystack" icon={<HeartTwoTone twoToneColor="#eb2f96"/>}>
                    <Link to={'/haystack'}>
                        Q/A Search
                    </Link>
                </Menu.Item>

                <Menu.Item key="document" icon={<FileTwoTone twoToneColor="#52c41a"/>}>
                    <Link to={'/document'}>
                        Document Search
                    </Link>
                </Menu.Item>
            </Menu>
        )
    }
    return (
        <Router>

            {menu()}
            <div className="App">
                <Switch>
                    <Route path="/" exact={true}>
                        <SearchElastics setActiveMenu={setActiveMenu}/>
                    </Route>
                    <Route path="/elastic" exact={true}>
                        <SearchElastics setActiveMenu={setActiveMenu}/>
                    </Route>
                    <Route path="/haystack" exact={true}>
                        <SearchHaystack setActiveMenu={setActiveMenu}/>
                    </Route>
                    <Route path="/document" exact={true}>
                        <SearchDocument setActiveMenu={setActiveMenu}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
