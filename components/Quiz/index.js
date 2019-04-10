import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { 
  white, 
  primaryDarkColor, 
  colorSuccess, 
  textColorSuccess, 
  colorDanger, 
  textColorDanger 
} from '../../utils/colors'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers'

function QuizBtn({ type, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.quizBtn,
        type === "Correct" ? { backgroundColor: colorSuccess } : { backgroundColor: colorDanger },
        {},
      ]}
      onPress={onPress}>
      <Text style={[styles.quizBtnText,
        type === "Correct" ? { color: textColorSuccess } : { color: textColorDanger },
        {}
      ]}>
        {type}
      </Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    showAnswer: false,
    correctCount: 0
  }

  restartNotification() {
    clearLocalNotification()
      .then(setLocalNotification());
  }

  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params

    return {
      title: "Quiz: " + deckKey
    }
  }

  render() {
    const { deck } = this.props
    const { currentQuestion, showAnswer, correctCount } = this.state

    return (
      <View style={styles.container}>
        {currentQuestion < deck.questions.length && (
          <View style={{ flexGrow: 1 }}>
            <View>
              <Text>Question: {currentQuestion + 1}/{deck.questions.length}</Text>
            </View>
            {showAnswer && (
              <View style={styles.questionContainer}>
                <Text style={styles.questionTitle}>{deck.questions[currentQuestion].answer}</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ showAnswer: !showAnswer })}>
                  <Text style={styles.showAnswerText}>Show Question</Text>
                </TouchableOpacity>
              </View>
            ) || (
                <View style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>{deck.questions[currentQuestion].question}</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({ showAnswer: !showAnswer })}>
                    <Text style={styles.showAnswerText}>Show Answer</Text>
                  </TouchableOpacity>
                </View>
              )}
            <View style={styles.buttonsContainer}>
              <QuizBtn type={"Correct"} onPress={() => this.setState({
                currentQuestion: currentQuestion + 1,
                correctCount: correctCount + 1,
                showAnswer: false
              })} />
              <QuizBtn type={"Incorrect"} onPress={() => this.setState({
                currentQuestion: currentQuestion + 1,
                correctCount: correctCount,
                showAnswer: false
              })} />
            </View>
          </View>
        )}

        {currentQuestion >= deck.questions.length && (
          <View style={{ flexGrow: 1 }}>
            <View style={styles.questionContainer}>
              <Text style={styles.answerTitle}>Your Score:</Text>
              <Text style={styles.result}>{correctCount}/{deck.questions.length}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <QuizBtn type={"Restart"} onPress={() => {
                this.restartNotification()
                this.setState({
                  currentQuestion: 0,
                  correctCount: 0,
                  showAnswer: false
                })
              }} />
              <QuizBtn type={"Back to deck"} onPress={() => {
                this.restartNotification()
                this.props.navigation.goBack()
              }} />
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
    backgroundColor: white,
  },
  questionContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  questionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quizBtn: {
    width: 200,
    marginTop: 20,
    backgroundColor: primaryDarkColor,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 10,
  },
  quizBtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  showAnswerText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
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
)(Quiz)