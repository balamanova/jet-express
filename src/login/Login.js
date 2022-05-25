import React from "react";
import LoginForm from './LoginForm'
import '../App.css'

class Login extends React.Component {
    render() {
        const { history } = this.props;

        return (
            <div className="login-form">
                <LoginForm history={history} />
            </div>
        );
    }
}

export default Login;
