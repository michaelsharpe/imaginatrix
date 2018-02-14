import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Tone extends Component {
  static defaultProps = {
    frequency: 200,
    type: 'sine',
    hertz: 15,
    intervalTime: 60,
    running: false
  }

  static contextTypes = {
    audioContext: PropTypes.object
  }

  constructor(props, context) {
    super(props)
    const { frequency, type, hertz, intervalTime } = this.props

    this.state = {
      frequency,
      type,
      hertz
    }

    // Grab audioContext from provider
    this.audioContext = context.audioContext
    window.audioContext = context.audioContext
    // Initialize left tone
    this.left = this.audioContext.createOscillator()
    this.left.type = type

    this.right = this.audioContext.createOscillator()
    this.right.type = type

    this.setFrequency({ frequency, hertz, intervalTime })
  }

  setFrequency({ frequency, hertz, intervalTime }) {
    const { left, right, audioContext } = this

    if(!this.state.running) {
      left.frequency.value = frequency
      right.frequency.value = frequency - hertz
    }

    left.frequency.linearRampToValueAtTime(frequency, audioContext.currentTime + intervalTime)
    right.frequency.linearRampToValueAtTime(frequency - hertz, audioContext.currentTime + intervalTime)
  }

  start() {
    if (!this.state.running ) {
      this.setState({
        ...this.state,
        running: true
      })
    }

    this.left.start()
    this.right.start()
  }

  componentDidMount() {
    const { audioContext, right, left } = this
    const merger = audioContext.createChannelMerger()

    left.connect(merger, 0, 0)
    right.connect(merger, 0, 1)

    merger.connect(audioContext.destination)
  }

  componentWillUpdate(nextProps, nextState) {
    this.setFrequency(nextProps)
  }

  render() {
    const buttonStyle = {
      width: '100%',
      height: '50px',
      borderRadius: 5,
      fontSize: 26
    }

    return (
      <div>
        { !this.state.running &&
          <button
            style={buttonStyle}
            onTouch={this.start.bind(this)}
            onClick={this.start.bind(this)}
          >Start!</button> }
        {this.props.children}
      </div>)
  }
}
