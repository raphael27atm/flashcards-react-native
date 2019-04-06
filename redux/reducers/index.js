import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions'

const decks = (state={}, action) => {
  switch(action.type) {
    case RECEIVE_DECKS: 
      return {
        ...state,
        ...action.decks
      }
    default:
      return state
  }
}

export default decks