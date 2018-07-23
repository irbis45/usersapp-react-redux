import React, {Component} from 'react';
import HeaderMenu from '../../containers/Header';

import {Container} from 'semantic-ui-react';
import '../style.sass';

class Front extends Component {
	render() {
		return [
			<HeaderMenu key='header' />,
			<div className='container' key='content'>
				<Container>
					This is front page!!!
				</Container>
			</div>
		];
	}
}

export default Front;