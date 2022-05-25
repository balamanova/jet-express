import React from "react";
import './App.css'
import './index.css';
import { PageHeader } from 'antd';
import logo from './images/logo-green.png'

export default () => (
    <PageHeader
        avatar={{ src: './images/logo-green.png'}}
        className="site-page-header"
        onBack={() => null}
        title="Title"
        subTitle="This is a subtitle"
    />
);