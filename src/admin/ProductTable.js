import {Table, Tag} from "antd";
import React from "react";
import axios from "axios";
import {API_URL} from "../login/LoginForm";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Status',
        dataIndex: 'orderStatus',
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

class ProductTable extends React.Component {
    state = {

    };

    componentDidMount() {
        axios.get(API_URL + "/orders").then(res => {
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

export default ProductTable;