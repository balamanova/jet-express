import React, { Component, useState } from "react";
import { Modal, Input, Form, Select, Button,  Checkbox, Col, Row, Alert } from "antd";
// // import {
// //     updateUniversity,
// //     getAllUniversity,
// // } from "../services/UniversityService";
//
import MaskedInput from "antd-mask-input";
// // import { createUniversityAdmin } from "../services/UserService";
import axios from "axios";
import {API_URL} from "../login/LoginForm";

const { Option } = Select;



const RegistrationForm = (props) => {
    const { universityList } = props;
    var filteredUniversityList = universityList;
    const [visible, setVisible] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        const { sName, fName, username, pass, street, group } = values;
        setButtonLoading(true)
        axios.post(API_URL+"/deliveries", {
            fname:fName,
            sname: sName,
            street,
            username,
            password: pass,
            productType: group
        }).then((res) => props.onDrawerChange()
        ).catch(err => {
            setVisible(true);
        }).finally(()=>setButtonLoading(false));
    };
    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="margin-right-30"
            scrollToFirstError
        >
            {visible ? (
                <Alert
                    className="margin-20"
                    message="Такой e-mail уже существует" type="error" closable afterClose={handleClose} />
            ) : null}
            <Form.Item
                name={"fName"}
                label="First Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"sName"}
                label="Second Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"username"}
                label="Username"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"pass"}
                label="Password"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Select" name = "street">
                <Select>
                    <Select.Option value="Бостандыкский">Бостандыкский район</Select.Option>
                    <Select.Option value="Алмалинский">Алмалинский район</Select.Option>
                    <Select.Option value="Ауэзовский">Ауэзовский район</Select.Option>
                    <Select.Option value="Медеуский">Медеуский район</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="group" label="Checkbox.Group">
                <Checkbox.Group>
                    <Row>
                        <Col span={8}>
                            <Checkbox
                                value="SOLID"
                                style={{
                                    lineHeight: '32px',
                                }}
                            >
                                SOLID
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox
                                value="COLD"
                                style={{
                                    lineHeight: '32px',
                                }}
                            >
                                COLD
                            </Checkbox>
                        </Col>

                        <Col span={8}>
                            <Checkbox
                                value="FRAGILE"
                                style={{
                                    lineHeight: '32px',
                                    marginLeft: '2px'
                                }}
                            >
                                FRAGILE
                            </Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item {...tailFormItemLayout} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit" loading = {buttonLoading} className="customButton">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

class UniversityModal extends Component {
    state = {
        item: "",
        visible: true,
    };

    componentDidMount() {
        this.setState({
            item: this.props.item,
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        const { item } = this.state;
        // updateUniversity(item.id, item).then((res) => console.log(res));
        this.props.onDrawerChange();
    };

    onItemChange = (description, key) => {
        var { item } = this.state;
        item[key] = description;
        this.setState({
            item,
        });
    };

    render() {
        const { item, universityList } = this.state;
        const { onDrawerChange, openDrawer } = this.props;
        // if (!item) {
        //   return <div />;
        // }
        return (
            <Modal
                visible={openDrawer}
                onOk={this.handleOk}
                onCancel={onDrawerChange}
                width={500}
                footer={null}
            >
                 <div className="justify-center margin-bottom-20 ">
                <RegistrationForm
                    universityList={universityList}
                    onDrawerChange={onDrawerChange}
                />
                 </div>
            </Modal>
        );
    }
}

export default UniversityModal;


export const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};


export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
