import React, { Component } from "react";
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import logo from "../images/logo.png";
import { Button } from "antd";
import ListUsers from "./ListUsers";
import ListProducts from "./ListProducts";


class Admin extends Component {
    state = {
        navHided: false,
        currentPage: "users",
    };

    onNavToogle = () => this.setState({ navHided: !this.state.navHided });
    onPageChanged = (eventKey) => {
        this.setState({ currentPage: eventKey });
    };

    onLogoutClick = () => {
        // logout();
        // this.props.history.push('')
    }

    render() {
        const { navHided, currentPage } = this.state;
        return (
            <div>
                <SideNav
                    className="sideNav"
                    onToggle={() => this.onNavToogle()}
                    onSelect={(eventKey, event) => {
                        this.onPageChanged(eventKey);
                    }}
                >
                    <Toggle />
                    <Nav defaultSelected={"products"}>
                        {navHided && <img className="imageDiv" src={logo} alt="Logo" />}
                        <NavItem eventKey="products">
                            <NavIcon>
                                <i
                                    className="fa fa-fw fa-home"
                                    style={{ fontSize: "1.75em" }}
                                />
                            </NavIcon>
                            <NavText>Products</NavText>
                        </NavItem>
                        <NavItem eventKey="users">
                            <NavIcon>
                                <i
                                    className="fa fa-fw fa-home"
                                    style={{ fontSize: "1.75em" }}
                                />
                            </NavIcon>
                            <NavText>Users</NavText>
                        </NavItem>
                    </Nav>
                    {navHided && <Button className="logout" onClick = {() => this.onLogoutClick()}>Logout</Button>}
                </SideNav>
                {currentPage === "products" ? (
                    <ListProducts navHided={navHided} />
                ) : (
                    <ListUsers navHided={navHided} />
                )}
            </div>
        );
    }
}

export default Admin;
