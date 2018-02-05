import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import IndexStyles from "./index.scss"

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less';
import {List, ListItem} from 'material-ui/List';

import Util from '../../utils/util'

class Login extends React.Component {
    static muiName = 'FlatButton';
    render() {
        return (
            <FlatButton {...this.props} label="Login" onClick={this.props.handleLogin}/>
        );
    }
}

const Logged = (props) => (
    <IconMenu
    {...props}
    iconButtonElement={
    <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{
        horizontal: 'right',
        vertical: 'top'
    }}
    anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
    }}
    >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);
Logged.muiName = 'IconMenu';

class _Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: true,
            activeIndex: -1,
        }
    }
    handleChange = (event, logged) => {
        this.setState({
            logged: logged
        });
    };
    handleLogin = (event) => {
        console.log("to login");
    };
    handleClick = (e) => {
        let util = new Util();
        let target = util.parentsUtil(e.target, "menu-item");
        // this.setState({
        //     activeIndex: ~~target.getAttribute("itemindex")
        // });
    };
    render() {
        let _this = this;
        const fontStyle = {
            fontFamily: "'FangZheng_yuesong',Arial",
        }
        return (
            <div className="menu-container">
                <List className="menu">
                    <AppBar title={this.props.menuList.data.title} style={{
                backgroundColor: this.props.appBarColor,...fontStyle
            }} className="appbar"
            iconElementLeft={<IconButton tooltip="首页"><FontIcon className="fa fa-home" /></IconButton>}
            iconElementRight={this.state.logged ? <Logged /> : <Login handleLogin={this.handleLogin}/>}/>
                    {this.props.menuList.data.list.map((item, i) => (
                <ListItem
                itemindex={i}
                key={"menu" + i}
                primaryText={item.title}
                style={fontStyle}
                onClick={_this.handleClick}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                className={"menu-item " + (_this.state.activeIndex == i ? "menu-active" : "")}
                nestedItems={!(item.list&&item.list.length>0)?[]:(item.list.map((iitem, j)=>(<ListItem key={"menu-item"+j} primaryText={iitem.title} style={fontStyle}/>)))}/>
            ))}
                </List>
                <style dangerouslySetInnerHTML={{
                __html: IndexStyles
            }}></style>
            </div>
        );
    }
}
export default _Menu;
// <Toggle label="Logged" defaultToggled={true} onToggle={this.handleChange} labelPosition="right" style={{
//     margin: 20
// }}/>
