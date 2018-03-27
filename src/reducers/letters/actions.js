import {FETCHING_TEST_LETTERS, FETCHING_TEST_LETTERS_DONE, LETTER_PRESSED, GAME_RESET} from "./actionCreators"

export function fetchLetters() {
  return function (dispatch) {
    dispatch({type: FETCHING_TEST_LETTERS});
    const randomLetters = () => {
      let letters = [];
      let possible = 'abcdefghijklmnopqrstuvwxyz0123456789{}[]:;()_!@#$%~`-+=';

      for (let i = 0; i < 10; i++)
        letters.push(possible.charAt(Math.floor(Math.random() * possible.length)))

      return letters;
    }
    dispatch({type: FETCHING_TEST_LETTERS_DONE, payload: randomLetters()})
  }
}

export function letterPressed(letter) {
  return function (dispatch) {
    dispatch({type: LETTER_PRESSED, payload: letter})
  }
}

export function gameReset() {
  return function (dispatch) {
    dispatch({type: GAME_RESET})

  }
}

