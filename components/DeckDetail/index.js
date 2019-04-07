import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { primaryTextColor, white, primaryDarkColor, primaryLightColor } from '../../utils/colors'
import { connect } from 'react-redux'

function AddCardBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.addBtn}
      onPress={onPress}>
      <Text style={styles.addBtnText}>Add card</Text>
    </TouchableOpacity>
  )
}

function StartQuizBtn({ onPress, isDisabled }) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[styles.addBtn,
      isDisabled ? { backgroundColor: primaryLightColor } : { backgroundColor: primaryDarkColor }]}
      onPress={onPress}>
      <Text style={styles.addBtnText}>Start Quiz</Text>
    </TouchableOpacity>
  )
}

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params

    return {
      title: deckKey
    }
  }

  render() {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.item} >
          <Text style={styles.itemTitle}>{deck.title}</Text>
          <Text>
            {deck.questions.length} {deck.questions.length !== 1
              ? "questions"
              : "question"}
          </Text>
        </View>
        <StartQuizBtn isDisabled={deck.questions.length <= 0} onPress={() => this.props.navigation.navigate(
          'Quiz',
          { deckKey: deck.key }
        )} />
        <AddCardBtn onPress={() => this.props.navigation.navigate(
          'AddCard',
          { deckKey: deck.key }
        )} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  itemTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  addBtn: {
    width: 200,
    marginTop: 50,
    backgroundColor: primaryDarkColor,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: primaryTextColor,
    fontSize: 22,
    textAlign: 'center',
  },
});

function mapStateToProps(state, { navigation }) {
  const { deckKey } = navigation.state.params

  return {
    deckKey,
    deck: state[deckKey],
  }
}

export default connect(
  mapStateToProps
)(DeckDetail)