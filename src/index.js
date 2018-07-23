import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FrontPage from './containers/FrontPage';
import UsersPage from './containers/UsersPage';

import 'semantic-ui-css/semantic.min.css';
import './index.sass';

import store from './store';


const Root = (
	<Provider store={store()}>
		<Router>
			<div>
				<Route exact path='/' component={FrontPage} />
				<Route path='/list_users' component={UsersPage} />
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(
	Root,
	document.getElementById('root')
);