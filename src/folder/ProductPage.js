import React, {useEffect} from "react";
import ProductTable from './ProductTable'
import PageHeader from '../Header'
import '../App.css'
import { useNavigate } from 'react-router-dom';

import {Button, Dropdown, Menu, Space} from 'antd';
import axios from "axios";
import {API_URL} from "../login/LoginForm";
import {DownOutlined} from "@ant-design/icons";

const ProductPage = (props) => {

    const navigate = useNavigate();
    const onSelectedClick = (history) => {
        navigate('/map')
    };

    const history = props.history;

    let data;
    useEffect(() => {
        axios.get(API_URL + "/orders-by-delivery/" + localStorage.getItem("id")).then(res => {
            data = res.data;
        })
    })

    return (
            <div>
                <div className={"header"}>
                    <div style={{}}>
                        <img className={"header-img"} src={require('../images/logo.png')} />
                    </div>
                    <div style={{width: "80%"}}></div>
                    <div className={"overlayStyle"}>
                        <Dropdown overlay={menu} >
                            <a onClick={(e) => {
                                e.preventDefault()
                            }}>
                                <Space className={"button-click"}>
                                    {localStorage.getItem("name")}
                                    <DownOutlined style={{ fontSize: '13px' }}/>
                                </Space>
                            </a>
                        </Dropdown>
                    </div>

                </div>
                <div className="product-page" >
                    <ProductTable history={history} data = {data} />
                </div>
                <div className={"product-button"}>
                    <button type='button' onClick={(history) =>
                        onSelectedClick(history)
                       }
                            className={"button-click"}>Create route</button>
                </div>

            </div>
        );
}

const onClick = ({ key }) => {
    // const navigate = useNavigate();
    // navigate(key)
};

const menu = (
    <Menu
        onClick={onClick}
        items={[
            {
                key: '/product',
                label: (
                    <a rel="noopener noreferrer" href="/product">
                        Products
                    </a>
                )
            },
            {
                key: '/',
                label: (
                    <a rel="noopener noreferrer" href="/">
                        LogOut
                    </a>
                )
            }
        ]}
    />
);
export default ProductPage;
