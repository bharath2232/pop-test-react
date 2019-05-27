import React from 'react'
import {Drawer, Divider, Col, Row, Button} from 'antd';


const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

class ViewOrder extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {orderData} = this.props;
        return (
            <div>
                <Button onClick={this.showDrawer}>View Order</Button>
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p style={{ ...pStyle, marginBottom: 24 }}>Order Details</p>
                    <p style={pStyle}>Personal</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Full Name" content={orderData && orderData.address.firstname} />{' '}
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Email" content={orderData.email} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Address"
                                content={orderData && orderData.address.addressLine1}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="City" content={orderData && orderData.address.addressCity} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Country" content={orderData && orderData.address.addressCountry} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Created Time" content={(orderData && orderData.address.createdTime)} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Updated Time" content={orderData && orderData.address.updatedTime} />
                        </Col>
                    </Row>
                    <Divider />
                    <Col span={12}>
                        <DescriptionItem title="#TODO (ALL Details of the order)"/>
                    </Col>
                </Drawer>
            </div>
        );
    }
}

export default ViewOrder
