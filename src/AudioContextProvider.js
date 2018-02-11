import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AudioContextProvider extends Component {
  static childContextTypes = {
    audioContext: PropTypes.object
  }

  constructor(props) {
    super(props);

    const Context = window.AudioContext || window.webkitAudioContext

    if (Context) {
      this.audioContext = new Context()
    } else {
      console.error("No context found.  Oops.")
      this.audioContext = {}
    }
  }

  componentWillUnmount(){
    if (this.audioContext) {
      this.audioContext.close()
    }
  }

  getChildContext() {
    return { audioContext: this.props.audioContext || this.audioContext }
  }

  render() {
    return (<div>{this.props.children}</div>)
  }
}
