import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import slideBarStyles from './slideBar.scss'

class SlideBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="slidebar-container">
            <label>{this.props.list.data.title}</label>
            <ul className="slidebar">
              {this.props.list.data.list.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
            </ul>
            <style dangerouslySetInnerHTML={{
                __html: slideBarStyles
            }}></style>
          </div>
        )
    }
}

export default SlideBar