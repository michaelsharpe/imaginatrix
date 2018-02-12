import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Tone extends Component {
  static defaultProps = {
    frequency: 200,
    type: 'sine',
    hertz: 15,
    start: true,
    intervalTime: 60
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
    // Initialize left tone
    this.left = this.audioContext.createOscillator()
    this.left.type = type
    this.right = this.audioContext.createOscillator()
    this.right.type = type

    this.setFrequency({ frequency, hertz, intervalTime })
  }

  setFrequency({ frequency, hertz, intervalTime }) {
    const { left, right, audioContext } = this
    console.log(left)

    left.frequency.linearRampToValueAtTime(frequency, audioContext.currentTime + intervalTime)
    right.frequency.linearRampToValueAtTime(frequency, audioContext.currentTime + intervalTime)
  }

  componentDidMount() {
    const { audioContext, right, left } = this
    const merger = audioContext.createChannelMerger()

    left.connect(merger, 0, 0)
    right.connect(merger, 0, 1)

    merger.connect(audioContext.destination)

    left.start()
    right.start()
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps)
    this.setFrequency(nextProps)
  }

  render() {
    return (<div>{this.props.children}</div>)
  }
}
