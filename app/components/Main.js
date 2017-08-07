import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

import TodoList from './TodoList';

var Main = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TodoList,
          title: 'Todo List',
          navigationBarHidden: true
        }}
        style={{flex: 1}}
      />
    );
  }
})

module.exports = Main;