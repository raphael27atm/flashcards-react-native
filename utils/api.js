import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, DEBUG_CLEAR_STORAGE, setDummyData } from './_data'

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(getAllDecks)
}

function getAllDecks(decks) {
  if (DEBUG_CLEAR_STORAGE) {
    console.log("Cleaning up storage")
    AsyncStorage.removeItem(DECKS_STORAGE_KEY)
    decks = null
  }

  if (decks === null && __DEV__) {
    console.log("Populate DB with dummy data")
    return setDummyData()
  } else {
    return JSON.parse(decks)
  }
}