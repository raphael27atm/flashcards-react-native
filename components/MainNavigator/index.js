import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import DeckList from '../DesckList'
import AddDeck from '../AddDeck'
import DeckDetail from '../DeckDetail'
import AddCard from '../AddCard'
import Quiz from '../Quiz'

import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation'
import { primaryLightColor, primaryTextLightColor } from '../../utils/colors'

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: ({ navigation }) => ({
      title: "Flashcards",
      headerTintColor: primaryTextLightColor,
      headerStyle: {
        backgroundColor: primaryLightColor,
      },
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('AddDeck')}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
            <Ionicons name='md-add' color={primaryTextLightColor} size={28} />
          </View>
        </TouchableOpacity>
      ),
    })
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "New Deck",
      headerTintColor: primaryTextLightColor,
      headerStyle: {
        backgroundColor: primaryLightColor,
      },
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: primaryTextLightColor,
      headerStyle: {
        backgroundColor: primaryLightColor,
      },
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "New Card",
      headerTintColor: primaryTextLightColor,
      headerStyle: {
        backgroundColor: primaryLightColor,
      },
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: primaryTextLightColor,
      headerStyle: {
        backgroundColor: primaryLightColor,
      },
    }
  },
})

export default MainNavigator