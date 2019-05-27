import React, { Component } from 'react'
import {Table, Tag, Typography} from "antd";
import ViewOrder from "./ViewOrder";

const columns = [
    {
        title: 'orderID',
        dataIndex: 'orderId',
        key: 'orderId',
        render: text => <Typography>{text}</Typography>,
    },
    {
        title: 'Short Id',
        dataIndex: 'shortId',
        key: 'shortId',
        render: text =><Typography>{text}</Typography>,
    },
    {
        title: 'Email',
        dataIndex: 'index',
        key: 'email',

    },
    {
        title: 'Price Products',
        dataIndex: '',
        key: 'priceProducts',
        render: text => <Typography>{text.priceProducts +' '+ text.currency}</Typography>,
    },
    {
        title: 'Price Shipping',
        dataIndex: '',
        key: 'priceShipping',
        render: text =><Typography>{text.priceShipping +' '+ text.currency}</Typography>,
    },
    {
        title: 'Total Paid',
        dataIndex: '',
        key: 'priceFinal',
        render: text =><Typography>{text.priceShipping +' '+ text.currency}</Typography>,
    },
    {
        title: 'Order Status',
        key: 'orderStatus',
        dataIndex: 'orderStatus',
        render: tags => (
            <span>
                <Tag color={tags === 'paid' || tags ==='printed' ? 'green': 'red'} >
                    {tags.toUpperCase()}
                </Tag>
      </span>
        ),
    },
    {
        title: 'Action',
        key: 'orderId',
        render: (data) => (
            <ViewOrder orderData={data}/>
        ),
    },
];

export class OrdersTable extends Component {
    render() {
        if (!this.props.data.data) {
            return <div>Please Select a Status from Orders Statuses</div>
        }
        return (
            <div>
                <Table columns={columns} bordered  pagination={5} dataSource={this.props.data.data}/>
            </div>
        )
    }
}

export default OrdersTable
