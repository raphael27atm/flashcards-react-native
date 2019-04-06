import { AsyncStorage } from 'react-native'

export const DEBUG_CLEAR_STORAGE = false
export const DECKS_STORAGE_KEY = 'FlashCards:decks'

export function setDummyData() {
  let dummyData = {
    React: {
      key: 'React',
      title: 'React',
      questions: [
        {
          question: 'Does React Native work with Android',
          answer: 'Yes!'
        },
        {
          question: 'What is a component?',
          answer: 'Components let you split the UI into independent, reusable pieces of code'
        },
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      key: 'JavaScript',
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}