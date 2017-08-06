import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {SIGNIN_URL, SIGNUP_URL} from '../api';
import {addAlert} from './alertsActions';

exports.loginUser = (email, password) => {
	return function(dispatch){
		return axios.post(SIGNIN_URL, {email, password}).then((response) => {
			var {user_id, token} = response.data;
			Keychain.setGenericPassword(user_id, token).then(function() {
				dispatch(addAlert(token));
				dispatch(authUser(user_id));
		}).catch((error) => {
			dispatch(addAlert("Couldn't login"));
		  });
		}).catch((error) => {
			dispatch(addAlert("Couldn't login"));
		})
	}
}

exports.signupUser = (email, password) => {
	return function(dispatch){
		return axios.post(SIGNUP_URL, {email, password}).then((response) => {
			var {user_id, token} = response.data;
			Keychain.setGenericPassword(user_id, token).then(function() {
				dispatch(addAlert(token));
				dispatch(authUser(user_id));
		}).catch((error) => {
			console.log(error)
			dispatch(addAlert("Couldn't sign up"));
		  });
		}).catch((error) => {
			console.log(error)
			dispatch(addAlert("Couldn't sign up"));
		})
	}
}

const authUser = (user_id) => {
	return {
		type: 'AUTH_USER',
		user_id
	}
}

exports.unauthUser = {
	type: 'UNAUTH_USER'
}