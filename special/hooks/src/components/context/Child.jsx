import React from 'react'
import { themeContext } from '../../context'

export default class Child extends React.Component{
  static contextType = themeContext
  render(){
    return (<div>
      <p>color:{this.context}</p>
    </div>)
  }
}