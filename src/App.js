import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.scss';
import AuthPage from './views/Auth/AuthPage';
import HomePage from './views/Home/HomePage';
import { sessionLogin } from './redux/thunk/AuthThunk'

export function App(props) {
	const { Auth, sessionLogin } = props;

	useEffect(() => {
		sessionLogin();
	}, [])

	return (
		<div className="App">
			<Switch>
				<Route exact path='/login' component={route => (<AuthPage Auth={Auth} {...route}/>)} />
				<Route path='/home' component={route => (<HomePage {...route}/>)} />
				{
					Auth.token === null ?
						<Redirect to='/login' />
						:
						<Redirect to='/home'/>
				}
			</Switch>
		</div>
	)
}

const mapStateToProps = ({ Auth}) => ({
	Auth,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		sessionLogin: sessionLogin
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

