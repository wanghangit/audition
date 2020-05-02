import React from 'react'

export default class About extends React.Component {
  componentDidMount(){
    throw new Error("err")
  }
  render() {
    return (<div>
      <p>lazy about{1/0}</p>
    </div>)
  }
}