import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchLetters, gameReset } from '../../reducers/letters/actions'
import './styles.css'

import Letters from '../../components/Letters'


import Countdown from 'react-countdown-now'

class GameInfo extends Component {
  state = {
    timerOn: true,
    gameStarted: false
  }

  handleGameStart = () => {
    this.setState({
      gameStarted: true
    })
  }

  handleGoBack = () => {
    this.props.dispatch(gameReset())
    this.props.dispatch(fetchLetters())
    this.setState({
      gameStarted: false,
      timerOn: true
    })
  }

  handleCountDownComplete = () => {
    this.setState({
      timerOn: false
    })
  }

  render() {
    const { gameStarted, timerOn  } = this.state
    const { mistakes, lettersRemaining } = this.props
    if (gameStarted) {
      return (
        <div>
          <div className='info-wrapper'>
            <div>Time Remaining: <span><Countdown date={Date.now() + 3000} onComplete={this.handleCountDownComplete}/></span></div>
            <div>Mistakes Count: <span>{mistakes}</span></div>
            <div>Letters Remaining: <span>{lettersRemaining}</span></div>
          </div>
          {lettersRemaining !== 0 &&
            <Letters timerOn={timerOn} />
          }
          {lettersRemaining === 0 &&
          <div className='results'>
            <h1 className='text'>YOU WON !</h1>
            <button className='btn' onClick={this.handleGoBack}>Go Back!</button>
          </div>
          }
          {!timerOn &&
            <div className='results'>
              <h1 className='text'>YOU LOST !</h1>
              <button className='btn' onClick={this.handleGoBack}>Go Back!</button>
            </div>
          }
        </div>
      );
    } else {
      return (
        <div className='results'>
          <h1 className='text'>Start the game</h1>
          <button className='btn' onClick={this.handleGameStart}>Start</button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  mistakes: state.lettersReducer.mistakes,
  lettersRemaining: state.lettersReducer.lettersRemaining
})

export default connect(mapStateToProps)(GameInfo);