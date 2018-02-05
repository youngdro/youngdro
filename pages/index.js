import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import SlideBar from '../components/SlideBar_index'
import IndexBg from '../components/IndexBg'
import Menu from '../components/Menu'
import Login from '../components/Login'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: true,
            showLogin: false,
        }
    }
    toLogin = ()=> {
        this.refs.login.dialogOpen();
    }
    render(props) {
        const buttonStyle = {
            margin: 12,
        };
        return (
            <Layout title={`首页`}>
                <MuiThemeProvider>
                    <div>
                        <IndexBg/>
                        <div className="main-title noselect title-adaption-font">WEB&nbsp;VALLEY</div>
                        <div className="main-buttons">
                            <Link><a href="/home">
                                <RaisedButton label="guest" className="main-button" style={buttonStyle}/>
                            </a></Link>
                            <RaisedButton label="login" className="main-button" style={buttonStyle} onClick={this.toLogin}/>
                        </div>
                        <Login ref="login"/>
                        <style jsx global>{`
                            .main-title{
                                position: absolute;
                                left:0;
                                top:50%;
                                font-size: 150px;
                                width: 100%;
                                line-height: 300px;
                                color: #fff;
                                text-align: center;
                                letter-spacing: 10px;
                                transform: translateY(-95%);
                                font-family:'Vevey','Century Gothic','Roboto', sans-serif;
                                -webkit-font-smoothing: antialiased;
                                overflow: hidden;
                                transition:font-size 0.2s ease-out;
                            }
                            .main-buttons{
                                position: absolute;
                                text-align: center;
                                left:0;
                                top:50%;
                                width: 100%;
                            }
                            .main-buttons span{
                                font-family:'Open Sans','Century Gothic','Roboto', sans-serif;
                            }
                        `}</style>
                    </div>

                </MuiThemeProvider>
            </Layout>
        )
    }
}

export default Index