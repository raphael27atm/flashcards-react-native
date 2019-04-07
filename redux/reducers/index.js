import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions'

const decks = (state={}, action) => {
  switch(action.type) {
    case RECEIVE_DECKS: 
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD_TO_DECK:
    return {
      ...state,
      [action.deckCard.key]: {
        ...state[action.deckCard.key],
        questions: action.deckCard.cards
      }
    }
    default:
      return state
  }
}

export default decks