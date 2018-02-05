import React from "react"
import fetch from 'isomorphic-unfetch'
import PropTypes from "prop-types"
import Link from "next/link"
import IndexStyles from "./index.scss"

// import classNames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Snackbar from 'material-ui/Snackbar';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const Loading = (props, state) => (
    <div style={{opacity:state.isLoadingShow?1:0}} className="login-loading">
         <RefreshIndicator
            size={40}
            left={10}
            top={0}
            status="loading"
        />
    </div>
)

class Login extends React.Component {
   constructor(props){
        super(props);
        this.state = {
            isDialogOpen:false,
            username:"",
            password:'',
            usernameError:'',
            passwordError:'',
            isLoadingShow:false,
            isSnackbarOpen:false,
            message:'',
        }
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value,
        usernameError:'',
        passwordError:''});
    };
    dialogOpen = () => {
        this.setState({
            isDialogOpen: true
        });
    };
    dialogClose = () => {
        this.setState({
            isDialogOpen: false,
            username:"",
            password:''
        });
    };
    snackbarOpen = (msg) => {
        this.setState({
            isSnackbarOpen: true,
            message:msg?msg:""
        });
    };
    snackbarClose = () => {
        this.setState({
            isSnackbarOpen: false
        });
    };
    loadingShow = () => {
        this.setState({isLoadingShow:true});
    };
    loadingHide = () => {
        this.setState({isLoadingShow:false});
    };
    handleLogin = () => {
        if(this.state.username == ''){
            this.setState({usernameError:'username is required'});
            return;
        }
        if(this.state.password == ''){
            this.setState({passwordError:'password is required'});
            return;
        }
        this.setState({isLoadingShow:true});
        fetch('https://www.easy-mock.com/mock/5a4f44eb9f5c04439cb0c3a8/youngdro/login',
        {
            method:'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'username':this.state.username, 'password':this.state.password})
        })
        .then(res => res.json())
        .then(json => {
            if(json.success){
                this.snackbarOpen("Login successful");
                this.dialogClose();
            }else{
                this.snackbarOpen("An incorrect username or password");
            }
            this.setState({isLoadingShow:false});
        })
        .catch(error=>{this.snackbarOpen("Failed to login");this.setState({isLoadingShow:false});console.log(error)});
    };
    fixHeight = () => {
        console.log("focus");
        // setTimeout(function(){
        //     document.body.scrollTop = document.body.scrollHeight;
        // },300);
    };
    componentDidMount () {
        window.loadingShow = this.loadingShow;
    }
    render () {
        const loadingStyle = {
            display: 'inline-block',
            position: 'relative',
            float: "left",
            boxShadow:"none"
        }
        var dialogActions = [
            <RefreshIndicator
                size={36}
                left={10}
                top={0}
                status="loading"
                style={{opacity:this.state.isLoadingShow?1:0,...loadingStyle}}
                className="login-loading"
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.dialogClose}
                style={{"color":"#000"}}
            />,
            <FlatButton
                label="Login"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleLogin}
                style={{"color":"#000"}}
            />,

        ];
        const snackbarStyle = {
            textAlign:"center"
        };
        return (
            <div className="login-container">
                <Dialog
                    actions={dialogActions}
                    modal={false}
                    open={this.state.isDialogOpen}
                    onRequestClose={this.dialogClose}
                    className="login-dialog"
                >
                    <TextField
                        hintText="Username Field"
                        floatingLabelText="Username"
                        type="text"
                        fullWidth={true}
                        onChange={this.handleChange('username')}
                        errorText={this.state.usernameError}
                        onFocus={this.fixHeight}
                    /><br/>
                    <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                        fullWidth={true}
                        onChange={this.handleChange('password')}
                        errorText={this.state.passwordError}
                    />
                </Dialog>
                <Snackbar
                    open={this.state.isSnackbarOpen}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={this.snackbarClose}
                    style={snackbarStyle}
                />
                <style dangerouslySetInnerHTML={{__html: IndexStyles}}></style>
            </div>
        );
    }
}
export default Login;
