import React, {Component} from 'react'
import {Button, Select, Typography} from "antd";
import Table from "./Table";
import {Redirect} from "react-router-dom";

const Option = Select.Option;


export class Dashboard extends Component {
    state = {
        data: '',
        orderStatus: '',
        limit: '',
        canIndexForward: '',
        logOut: false
    };

    handleLogout = () => {
        fetch(`https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/logout`, {
            method: 'POST',
            headers: {
                "sessionToken": this.props.token.sessionToken
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({logOut: true})
            })
    };


    handleFetch = () => {
        const {orderStatus, limit, canIndexForward} = this.state;
        fetch(`https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/orders?orderStatus=${orderStatus}&limit=${parseInt(limit)}&canIndexForward=${canIndexForward}`, {
            headers: {
                "sessionToken": this.props.token.sessionToken
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({data: data})
            })
    };

    handleFilter = (data, filter) => {
        this.setState({[filter]: data}, () => {
            this.handleFetch()
        });
    };

    render() {

        const {data} = this.state;
        const {token} = this.props;
        if (!this.props.token) {
            return <Typography>You are not logged in</Typography>
        }
        if (this.state.logOut) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <div style={{position: 'absolute', left: '20%', top: '10%', right: '20%'}}>
                    <Typography style={{paddingLeft: 20}}>User : {token.group} </Typography>
                    <Select defaultValue="Order Status" style={{width: 120}}
                            onChange={(e) => this.handleFilter(e, 'orderStatus')}>
                        <Option value="printed">Printed</Option>
                        <Option value="paid">Paid</Option>
                        <Option value="error">Error</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                    </Select>
                    <Select defaultValue="Limit" style={{width: 120, margin: 20}}
                            onChange={(e) => this.handleFilter(e, 'limit')}>
                        <Option value='10'>10</Option>
                        <Option value="20">20</Option>
                        <Option value="50">50</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                    </Select>
                    <Select defaultValue="Sort" style={{width: 120}}
                            onChange={(e) => this.handleFilter(e, 'canIndexForward')}>
                        <Option value="0">Ascending</Option>
                        <Option value="1">Descending</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                    </Select>

                    <Button type="primary" onClick={this.handleLogout}>Logout</Button>
                    <Table data={data}/>
                </div>
            </div>

        )
    }
}

export default Dashboard
