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
				<Route path='/auth' component={AuthPage} />
				<Route path='/home' component={HomePage} />
				{
					Auth.token === null ?
						<Redirect to='/auth/login' />
						:
						(<Redirect to='/home/boards'/>)
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

