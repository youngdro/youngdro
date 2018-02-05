import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import IndexStyles from "./index.scss"
import fetch from 'isomorphic-unfetch'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import MyCard from '../Card'

class Homemain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationData: {},
            loadingShow: true,
            isRefreshing: false,
        };
    }
    getNavigationData = () => {
        let _this = this;
        fetch('https://www.easy-mock.com/mock/5a4f44eb9f5c04439cb0c3a8/youngdro/getWebNavigation')
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log(json);
                    _this.setState({navigationData:json, loadingShow:false})
                } else {
                    console.log("failed");
                }
            })
            .catch(error => {
                console.log(error)
            });
    };
    refresh = () => {
        this.setState({navigationData: {},loadingShow: true, isRefreshing:true},this.getNavigationData);
        // this.getNavigationData();
    };
    componentDidMount() {
        this.getNavigationData();
    }
    render() {
        const fontStyle = {
            fontFamily: "'FangZheng_yuesong','Vevey',Arial",
        }
        const loadingStyle = {
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)"
        }
        return (
            <div className="homemain-container">
                <AppBar title={"标题"} className="home-appbar" style={{
                backgroundColor: this.props.appBarColor,...fontStyle
            }}
            iconElementLeft={<IconButton tooltip="菜单" onClick={this.props.showMenu}><FontIcon className="fa fa-bars" /></IconButton>}
            iconElementRight={<IconButton onClick={this.refresh}><FontIcon className={"fa fa-rotate-right "+(this.state.isRefreshing?"rotate":"")} /></IconButton>}/>
                <div className="home-main">
                    {this.state.loadingShow ? <RefreshIndicator
                        size={50}
                        left={70}
                        top={0}
                        loadingColor="#316d6e"
                        status="loading"
                        className="loading"
                        style={loadingStyle}
                    /> : ""}
                {this.state.navigationData.data?this.state.navigationData.data.list.map((category, i)=>(
                    <div>
                        <div key={"category-"+i} className="paper-title">{category.category}</div>
                        <Paper key={"paper-"+i} zDepth={0} className="card-paper">
                        {category.items.map((item, j)=> (
                            <MyCard href={item.href} keyindex={j} key={"card-item-"+j} avatar={item.logo} title={item.name} content={item.desc} className="card-item"/>
                        ))}
                        </Paper>
                    </div>
                )):""}
                </div>
                <style dangerouslySetInnerHTML={{
                __html: IndexStyles
            }}></style>
            </div>
        );
    }
}
export default Homemain;
