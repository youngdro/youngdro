import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import IndexStyles from "./index.scss"
const Remarkable = require('remarkable');

class MdEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content:""
        }
    }
    rawMarkup(){
        var md = new Remarkable({
  html:         false,        // Enable html tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      false,        // Autoconvert url-like texts to links
  typographer:  false,        // Enable smartypants and other sweet transforms
  // Highlighter function. Should return escaped html,
  // or '' if input not changed
  highlight: function (/*str, , lang*/) { return ''; }
});
        // console.log(md.render('# Remarkable rulezz!'));
        var rawMarkup = md.render(this.state.content.toString());
        return {__html:rawMarkup};
    }
    editorChange(){
        this.setState({content:this.refs.editor.value});
    }
    render () {

        return (
            <div className="mdEditor-container markdown-body">
                <div className="editor-container"><textarea ref="editor" name="editor" id="editor" onChange={this.editorChange.bind(this)}></textarea></div>
                <div className="markdown-container"><div dangerouslySetInnerHTML={this.rawMarkup()}></div></div>
                <style dangerouslySetInnerHTML={{__html: IndexStyles}}></style>
            </div>
        );
    }
}
export default MdEditor;
