import fetch from 'isomorphic-unfetch'
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const SlidebarList = (props) => (
  <div>
    <h1 className="slidebar-title">Batman TV Showss</h1>
    <ul>
     123
    </ul>
  </div>
)

SlidebarList.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  console.log(data);
  return {
    lists: data
  }
}

export default SlidebarList