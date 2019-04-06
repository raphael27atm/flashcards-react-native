import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import DeckList from '../DesckList'
import AddDeck from '../AddDeck'

import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation'
import { primaryColor, primaryTextColor } from '../../utils/colors'

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: ({ navigation }) => ({
      title: "Flashcards",
      headerTintColor: primaryTextColor,
      headerStyle: {
        backgroundColor: primaryColor,
      },
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('AddDeck')}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
            <Ionicons name='md-add' color={primaryTextColor} size={28} />
          </View>
        </TouchableOpacity>
      ),
    })
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "New Deck",
      headerTintColor: primaryTextColor,
      headerStyle: {
        backgroundColor: primaryColor,
      },
    }
  },
})

export default MainNavigator