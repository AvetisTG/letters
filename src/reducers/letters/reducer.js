import {FETCHING_TEST_LETTERS, FETCHING_TEST_LETTERS_DONE, LETTER_PRESSED, GAME_RESET} from "./actionCreators"

const initialState = {
  testLetters: [],
  lastLetter: '',
  currentIndex: 0,
  mistakes: 0,
  lettersRemaining: 10,
  fetching: false,
  fetched: false
}

export default function reducer (state=initialState, action) {
  switch (action.type) {
    case FETCHING_TEST_LETTERS: {
      return {...state, fetching: true}
    }
    case FETCHING_TEST_LETTERS_DONE: {
      return {...state, fetching: false, fetched: true, testLetters: action.payload}
    }
    case LETTER_PRESSED: {
      if (action.payload === state.testLetters[state.currentIndex]){
        return {...state, lastLetter: action.payload, currentIndex: state.currentIndex += 1, lettersRemaining: state.lettersRemaining -= 1}
      } else if (action.payload !== state.testLetters[state.currentIndex]) {
        return {...state, lastLetter: action.payload, mistakes: state.mistakes += 1}
      }
      return {...state}
    }
    case GAME_RESET: {
      return initialState
    }
    default: {
      return {...state}
    }
  }
}