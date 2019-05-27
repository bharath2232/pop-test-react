import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './components/Login'
import Dashboard from './components/Dashboard'


export class Routes extends React.Component {

    state = {
        token: ''
    };

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Login token={(e) => this.setState({token: e})}/>}/>
                    <Route path="/dashboard" exact component={() => <Dashboard token={this.state.token}/>}/>
                    <Route/>
                </Switch>
            </Router>
        )
    }
}

export default Routes

