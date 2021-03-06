import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { markets } from './config/data';
import db from './lib/database'
import _ from 'lodash'

const UserData = db.ref('UserData')

export default class Market extends Component {

  constructor(props){
    super(props)
      this.state = {
        markets:[]
      }
  }

  componentDidMount(){
    UserData.on('value', snapshot => {
      this.setState({
        markets: snapshot.val()
      })
    })
  }

  onLearnMore = (market, id) => {
    this.props.navigation.navigate('MarketCarousel', { ...market, id });
  };




  render() {
    const markets = this.state.markets

    return (
      <ScrollView>
        <List style={styles.list}>
            {_.map(this.state.markets, (market, id) => (
              <ListItem
                key={id}
                roundAvatar
                avatar={{ uri: market.thumbnail }}
                title={market.name}
                subtitle={market.suburb}
                onPress={() => this.onLearnMore(market, id)}
              />
            ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
      marginTop: 0,
      backgroundColor: '#FFF'
  }
})
