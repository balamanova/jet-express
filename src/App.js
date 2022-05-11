import './App.css';
import {Map} from "./map/Map";
import {Button, Checkbox, Form, Input} from 'antd'

function App() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="App">
            <Map />
        </div>
    );
}

export default App;
