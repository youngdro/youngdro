import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MdEditor from '../components/MdEditor'
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(props) {
        const buttonStyle = {
            margin: 12,
        };
        return (
            <Layout title={`编辑`}>
                <MuiThemeProvider>
                    <div style={{height:'100%'}}>
                        <MdEditor/>
                    </div>
                </MuiThemeProvider>
            </Layout>
        )
    }
}
export default Editor