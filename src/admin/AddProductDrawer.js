import React, {Component, useEffect, useState} from "react";
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
    const [product, setProduct] = useState([]);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        const {x, y, address } = values;
        setButtonLoading(true)
        console.log(values)
        axios.post(API_URL+"/order", {
            x, y, address,
            productId: values.product
        }).then((res) => {
            props.onDrawerChange();
        }
        ).catch(err => {
            setVisible(true);
        }).finally(()=>  setButtonLoading(false));
        console.log("Received values of form: ", values);
    };
    const handleClose = () => {
        setVisible(false);
    };
    useEffect(() => {
        axios.get(API_URL+"/product").then(res => setProduct(res.data))
    },[])

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
                name={"product"}
                label="Product"
                style={{
                    marginBottom: 20,

                }}
                rules={[
                    {
                        required: true,
                        message: 'Province is required',
                    },
                ]}
            >
                <Select placeholder="Select product">
                    { product.map((key, index) => {
                        return <Option value={key.id}>{key.name}</Option>
                      })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name={"address"}
                label="Address"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Coordinates"
                style={{
                    marginBottom: 0,
                }}
            >
                <Form.Item
                    name="x"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                    }}
                >
                    <Input placeholder="x" />
                </Form.Item>
                <Form.Item
                    name="y"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                        margin: '0 8px',
                    }}
                >
                    <Input placeholder="y" />
                </Form.Item>
            </Form.Item>

            <Form.Item {...tailFormItemLayout} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit" loading = {buttonLoading} className="customButton">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

class AddProductDrawer extends Component {
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

export default AddProductDrawer;


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
