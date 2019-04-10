import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { fetchDecks } from '../../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../../redux/actionCreators'
import { AppLoading } from 'expo'
import { white } from '../../utils/colors'

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state
    const deckList = Object.values(decks)

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ paddingBottom: 16, paddingTop: 16 }}
          data={deckList}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'DeckDetail',
                { deckKey: item.key }
              )}>
              <View style={styles.item} >
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text>
                  {item.questions.length} {item.questions.length !== 1
                    ? "questions"
                    : "question"}
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
