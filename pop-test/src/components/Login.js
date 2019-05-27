import React, {Component} from 'react'
import {Alert, Button, Icon, Input, Spin, Tooltip, Typography} from 'antd';
import 'antd/dist/antd.css';
import {Redirect} from "react-router-dom";


export class Login extends Component {
    state = {
        username: "",
        password: "",
        tokenData: ""
    };
    handleLogin = async () => {
        const  {username, password} = this.state;
        const loginDetails = {
            username :username,
            password:password
        };
        this.setState({loading: true});
        fetch('https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails)
        }).then(response => response.json())
            .then(data => {
                this.setState({tokenData: data, loading: false});
                this.props.token(data.data);
            })
    };

    render() {
        const {tokenData, loading} = this.state;
        if (tokenData.data) {
            return <Redirect to='/dashboard'/>
        }
        return (
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Input
                    placeholder="Enter your Username"
                    onChange={(e) => this.setState({username: e.target.value})}
                    style={{justifyContent: 'center', alignItems: 'center', margin: 10}}
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={
                        <Tooltip title="Enter your username">
                            <Icon type="info-circle" style={{color: 'rgba(0,0,0,.45)'}}/>
                        </Tooltip>
                    }
                />
                <Input
                    type="password"
                    placeholder="Enter your Password"
                    onChange={(e) => this.setState({password: e.target.value})}
                    style={{justifyContent: 'center', alignItems: 'center', margin: 10}}
                    prefix={<Icon type="small-dash" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={
                        <Tooltip title="Enter your Password">
                            <Icon type="info-circle" style={{color: 'rgba(0,0,0,.45)'}}/>
                        </Tooltip>
                    }
                />
                <Button onClick={this.handleLogin} style={{margin: 10, alignItems: 'left', alignSelf: 'left'}}
                        type="primary">Login</Button>
                {loading ? <Spin style={{marginLeft: 15}}/> : <div></div>}
                {tokenData && tokenData.errorMessage ?
                    <Alert style={{marginBottom: 20}} message={tokenData.errorMessage} type="error"/>  :
                    <div> </div>}
                    <Typography style={{marginTop: 100 ,marginLeft:10}}>Developed by Bharat Nagandla for Pop.co</Typography>

            </div>
        )
    }
}

export default Login
