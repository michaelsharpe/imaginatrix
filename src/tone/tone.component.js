import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Tone extends Component {
  static defaultProps = {
    frequency: 200,
    type: 'sine',
    hertz: 15
  }

  static contextTypes = {
    audioContext: PropTypes.object
  }

  constructor(props, context) {
    super(props)

    const { audioContext } = context
    const { frequency, type, hertz } = this.props

    // Grab audioContext from provider
    this.audioContext = audioContext

    // Initialize left tone
    this.left = audioContext.createOscillator()
    this.left.type = type
    this.left.frequency.value = frequency

    // Initialize right tone with hertz difference
    this.right = audioContext.createOscillator()
    this.right.type = type
    this.right.frequency.value = frequency + hertz
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

  render() {
    return (<div>{this.props.children}</div>)
  }
}
