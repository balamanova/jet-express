import React, { useState } from "react";
import "antd/dist/antd.css";

import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import logo from "../images/logo.png";
import {useNavigate} from "react-router-dom";

export const API_URL = "http://localhost:8080/delivery"
const LoginForm = (props) => {
    const [form] = Form.useForm();
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(true);
    const navigate = useNavigate();
    const loginSubmit = (email, password) => {
        axios.get(API_URL+"/deliveries/?pass=" + password+ "&name=" + email)
            .then(res => {
                localStorage.setItem("id",res.data.key);
                localStorage.setItem("name",res.data.username);
                navigate(res.data.username == "admin" ? "/admin" :"/product")
            })
    };

    const onFinish = (values) => {
        loginSubmit(values.email, values.password);
    };

    return (
        <Form
            {...layout}
            // onValuesChange = {onValuesChange}
            form={form}
            name="register"
            onFinish={onFinish}
            size = {"middle"}
        >
            <div className="text-align-center">
                <img className="imageDiv" src={logo} alt="Logo" />
            </div>
            {hasLoginFailed && <div className="loginFailed">Неверное имя пользователя или пароль</div>}
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input
                    className="border-radius-15"
                    maxLength = {13}
                    prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder={"Username"}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password",
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    className="border-radius-15"
                    placeholder= "Password"
                />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button
                    htmlType="submit"
                    className="border-radius-15 login-form-button"
                >
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export const layout = {
    labelCol: {
        span: 8,
    },
    // wrapperCol: {
    //   span: 16,
    // },
};
export const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 16,
    },
};

export default LoginForm;
