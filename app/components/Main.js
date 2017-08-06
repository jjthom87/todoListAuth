import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {unauthUser} from '../actions';

var Main = React.createClass({
  onLogout: function(){
  	this.props.dispatch(unauthUser);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>
          Welcome to Main Native!
        </Text>
        <TouchableOpacity onPress={this.onLogout}>
        	<Text>
        		Logout
        	</Text>
       	</TouchableOpacity>
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = connect()(Main);