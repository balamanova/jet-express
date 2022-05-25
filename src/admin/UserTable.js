import {Table, Tag} from "antd";
import React from "react";
import axios from "axios";
import {API_URL} from "../login/LoginForm";

const columns = [
    {
        title: 'First name',
        dataIndex: 'fname',
    },
    {
        title: 'Second name',
        dataIndex: 'sname',
    },
    {
        title: 'Username',
        dataIndex: 'username',
    },
    {
        title: 'Street',
        dataIndex: 'street',
    },
    {
        title: 'Tags',
        dataIndex: 'productType',
        render: tags => (
            <>
                {tags?.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

class UserTable extends React.Component {
    state = {

    };

    componentDidMount() {
        axios.get(API_URL + "/deliveries-all").then(res => {
            console.log(res)
            this.setState({
                data: res.data
            });
        })
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        );
    }

};

export default UserTable;