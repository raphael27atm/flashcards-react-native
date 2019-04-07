import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { primaryColor, primaryLightColor, primaryDarkColor, primaryTextColor, gray, white } from '../../utils/colors'
import { connect } from 'react-redux'
import { saveCardToDeck } from '../../utils/api'
import { addCardToDeck } from '../../redux/actionCreators'

function SubmitBtn({ onPress, isDisabled }) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
        isDisabled ? { backgroundColor: primaryLightColor } : { backgroundColor: primaryDarkColor }
      ]}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  }

  submit = () => {
    const { deck } = this.props

    const card = {
      question: this.state.question,
      answer: this.state.answer
    }

    deck.questions.push(card)

    this.props.dispatch(addCardToDeck({
      key: deck.key,
      cards: deck.questions
    }))

    this.props.navigation.goBack()

    saveCardToDeck({ key: deck.key, cards: deck.questions })
  }

  render() {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput style={styles.input}
          underlineColorAndroid={primaryColor}
          selectionColor={primaryLightColor}
          placeholder={"Question"}
          value={question}
          onChangeText={
            (question) => this.setState({ question })
          } />
        <TextInput style={styles.input}
          underlineColorAndroid={primaryColor}
          selectionColor={primaryLightColor}
          placeholder={"Answer"}
          value={answer}
          onChangeText={
            (answer) => this.setState({ answer })
          } />
        <SubmitBtn onPress={this.submit} isDisabled={!question || !answer} />
      </KeyboardAvoidingView>
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
  input: {
    width: 300,
    height: 40,
    padding: 5,
    marginTop: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: gray
  },
  submitBtnText: {
    color: primaryTextColor,
    fontSize: 22,
    textAlign: 'center',
  },
  iosSubmitBtn: {
    marginTop: 50,
    backgroundColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    marginTop: 50,
    backgroundColor: gray,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state, { navigation }) {
  const { deckKey } = navigation.state.params

  return {
    deck: state[deckKey],
  }
}

export default connect(
  mapStateToProps
)(AddCard)