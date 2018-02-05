import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import Link from "next/link"
import IndexStyles from "./index.scss"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Util from '../../utils/util'
class MyCard extends React.Component {
   constructor(props){
      super(props);
    }
    componentDidMount(){
        let util = new Util();
        setTimeout(()=>{
            util.removeClass(ReactDOM.findDOMNode(this.refs.card),"card-willshow");
        },100*(~~this.props.keyindex))
    }
    render () {
        const textStyle = {
            padding:"0 16px",
            marginBottom:'16px',
            fontFamily:"'FangZheng_yuesong',Arial",
            lineHeight:"30px",
            color:"rgba(0, 0, 0, 0.7)",
            minHeight:"60px",
            fontSize:"13px"
        }
        return (
            <a href={this.props.href} key={this.props.key} className={this.props.className} target="_blank">
                <Card className={"card-willshow card-container"}  ref="card">
                    <CardHeader
                        title={this.props.title}
                        avatar={this.props.avatar}
                        style={{fontFamily:"'FangZheng_yuesong',Arial"}}
                    />
                    <CardText className="line-clamp-2" style={textStyle}>{this.props.content}</CardText>
                    <style dangerouslySetInnerHTML={{__html: IndexStyles}}></style>
                </Card>
            </a>
        );
    }
}
export default MyCard;
