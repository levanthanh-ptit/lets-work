import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.scss';
import AuthPage from './views/Auth/AuthPage';
import HomePage from './views/Home/HomePage';
import * as AuthThunk from './redux/thunk/AuthThunk';
import { sessionLogin } from './redux/actions/AuthAction'

export function App(props) {
	const { Auth, sessionLogin } = props;

	useEffect(() => {
		async function effect() {
			var token = localStorage.getItem('token');
			if(token !== null) sessionLogin(token);
		}
	}, [])

	return (
		<div className="App">
			<Switch>
				<Route exact path="/login" component={() => (<AuthPage Auth={Auth} />)} />
				<Route exact path="/user" component={() => (<HomePage Auth={Auth} />)} />
				{
					Auth.token === null ?
						<Redirect to="/login" />
						:
						<Redirect to="/user" />
				}
			</Switch>
		</div>
	)
}

const mapStateToProps = ({ Auth }) => ({
	Auth: Auth
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		sessionLogin: sessionLogin
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

