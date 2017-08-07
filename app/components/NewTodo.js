import React, { Component } from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
  ScrollView,
  RefreshControl,
  TextInput
} from 'react-native';

import {createTodo} from '../actions';

var NewTodo = React.createClass({
  getInitialState: function(){
    return {
      newTodoText: undefined,
      loading: false
    }
  },
  addNewTodo: function(){
    var {newTodoText} = this.state;
    var {dispatch} = this.props;
    if(newTodoText && newTodoText != ""){
      this.setState({ loading: true })
      dispatch(createTodo(newTodoText)).then(() => {
        this.setState({ loading: false })
        this.props.navigator.pop();
      })
    }
  },
  onBack: function(){
    this.props.navigator.pop();
  },
  render: function() {
    var renderScrollViewOrLoading = () => {
      if(this.state.loading){
        return (
          <View>
            <Text>
              Creating todo...
            </Text>
          </View>
        )
      } else {
        return (
          <ScrollView
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(newTodoText) => {
                  this.setState({newTodoText})
                }}
                placeholder="New To-Do Text"
                style={styles.input}
              />
            </View>
          </ScrollView>
        )
      }
    }
    return (
    	<View style={styles.container}>
    		<View style={styles.topBar}>
    			<TouchableOpacity onPress={this.onBack}>
    				<Icon name="chevron-left" size={20} color="white"/>
    			</TouchableOpacity>
    			<Text style={styles.title}>
    				New To-Do
    			</Text>
    			<TouchableOpacity onPress={this.addNewTodo}>
    				<Icon name="check" size={20} color="white"/>
    			</TouchableOpacity>
    		</View>
        {renderScrollViewOrLoading()}
    	</View>
    );
  }
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	},
	topBar: {
		padding: 16,
		paddingTop: 28,
		paddingBottom: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#2ecc71'
	},
	title: {
		color: 'white',
		fontSize: 20
	},
  input: {
    height: 26
  },
  inputContainer: {
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2ecc71'
  }
})

var mapStateToProps = (state) => {
	return {
		todos: state.todos
	}
}

module.exports = connect(mapStateToProps)(NewTodo);