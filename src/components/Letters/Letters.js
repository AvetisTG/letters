import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchLetters, letterPressed } from '../../reducers/letters/actions'
import './styles.css'

class Letters extends Component {

  componentWillMount() {
    this.props.dispatch(fetchLetters());
  }

  handleKeyPress() {
    const letter = this.refs.letter.value
    this.props.dispatch(letterPressed(letter))
  }

  render() {
    const { testLetters, currentIndex, timerOn } = this.props

    return (
      <div>
        <div className='letters-wrapper'>
          <ul>
            {testLetters.map((letter, i) => (
              <li key={i} className={currentIndex === i ? 'active-key' : currentIndex > i ? 'correct-letter' : ''}>{letter}</li>
            ))}
          </ul>
          {timerOn &&
          <form>
            <input
              autoFocus
              type="text"
              placeholder='Type here'
              value=''
              onChange={this.handleKeyPress.bind(this)}
              ref='letter'
            />
          </form>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  testLetters: state.lettersReducer.testLetters,
  currentIndex: state.lettersReducer.currentIndex
})

export default connect(mapStateToProps)(Letters);