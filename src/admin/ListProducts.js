import React, { Component, useState } from "react";
import {
    Select,
    Table,
    Button,
    InputNumber,
    Popconfirm,
    Form,
    Input,
} from "antd";

// import {
//     getUniversities,
//     getUniversityById,
// } from "../services/UniversityService";
import AddUserDrawer from "./AddUserDrawer";
// import { getUniversityAdmins } from "../services/UserService";
import UserTable from "./UserTable";
import axios from "axios";
import {API_URL} from "../login/LoginForm";
import AddProductDrawer from "./AddProductDrawer";
import ProductTable from "./ProductTable";

class ListProducts extends Component {
    state = {
        users: [],
        searchText: "",
        currentPage: 1,
        openDrawer: false,
        total: 0,
    };

    getUniversities = () => {
        const { searchText, currentPage } = this.state;
        axios.get(API_URL + "/orders").then(res => {
            console.log("get")
            this.setState({
                users: res.data
            });
        })
    };

    componentDidMount() {
        this.getUniversities();
    }

    onDrawerChange = () => {
        this.setState({ openDrawer: !this.state.openDrawer });
        this.getUniversities()
    };

    render() {
        const { users, openDrawer, onOpenUserEditDrawer } = this.state;
        const { navHided } = this.props;
        return (
            <div
                className="basic-container"
                style={{ marginLeft: navHided && "300px" }}
            >
                <AddProductDrawer
                    openDrawer={openDrawer}
                    onDrawerChange={() => this.onDrawerChange()}
                />
                <Button
                    onClick={() => this.onDrawerChange()}
                    className="customButton"
                    type="primary"
                >
                    Add products
                </Button>

                <div>
                    <ProductTable
                        data={users}
                        refreshData={() => this.getUniversities()}
                    />
                </div>
            </div>
        );
    }
}

export default ListProducts;
