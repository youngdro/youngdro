import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IndexBg from '../components/IndexBg'
import Menu from '../components/Menu'
import Homemain from '../components/Homemain'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: true,
            showLogin: false,
            docked: true,
            appBarColor: '#316d6e'
        }
    }
    static async getInitialProps() {
        try {
            const res = await fetch(' https://www.easy-mock.com/mock/5a4f44eb9f5c04439cb0c3a8/youngdro/slideBarData');
            const data = await res.json();
            console.log(data);
            return {
                menuList: data
            };
        } catch ( e ) {
            return {
                menuList: {
                    "status": 400,
                    "success": false,
                    "data": {
                        "title": "",
                        "list": []
                    }
                }
            };
        }
    }
    toLogin = () => {
        this.refs.login.dialogOpen();
    }
    componentDidMount() {
        this.autoDrawer();
        window.onresize = () => {
            this.autoDrawer();
        }
    }
    autoDrawer() {
        document.body.clientWidth < 990 ? this.setState({
            openDrawer: false,
            docked: false
        }) : this.setState({
            openDrawer: true,
            docked: true
        })
    }
    openDrawer() {
        !this.state.openDrawer ? this.setState({
            openDrawer: true
        }) : undefined;
    }
    render(props) {
        const buttonStyle = {
            margin: 12,
        };
        return (
            <Layout title={`首页`}>
                <MuiThemeProvider>
                    <div>
                        <Drawer width={256} open={this.state.openDrawer} docked={this.state.docked} disableSwipeToOpen={false} onRequestChange={(openDrawer) => this.setState({openDrawer})}>
                            <Menu menuList={this.props.menuList} appBarColor={this.state.appBarColor}/>
                        </Drawer>
                         <Homemain showMenu={this.openDrawer.bind(this)} appBarColor={this.state.appBarColor}/>
                        <style jsx global>{`
                        `}</style>
                    </div>

                </MuiThemeProvider>
            </Layout>
        )
    }
}
export default Home