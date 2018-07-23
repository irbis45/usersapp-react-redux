import React, {Component} from 'react';
import api from '../../api/index';

import _map from 'lodash/map';

import Filter from '../../containers/Filter';
import HeaderMenu from '../../containers/Header';
import UserTable from '../../components/tableUser';

import {Container, Grid} from 'semantic-ui-react';

import '../style.sass';

class Users extends Component {
	state = {
		media   : {
			desktop: {
				row            : 2,
				columnWidthMain: 12,
				columnWidthMenu: 4
			},

			mobile: {
				row            : 1,
				columnWidthMain: 16,
				columnWidthMenu: 16
			}
		},
		isMobile: false
	};

	componentWillMount() {
		this.updateDimensions();

		api.listUsers()
			.then(( {data} ) => {
				this.props.getUsers(data);
			})
			.catch(err => console.log(err)
			);
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions = () => {
		const w               = window;
		const d               = document;
		const documentElement = d.documentElement;
		const body            = d.getElementsByTagName('body')[0];
		const width           = w.innerWidth || documentElement.clientWidth || body.clientWidth;

		if( !this.state.isMobile && width < 1024 ) {
			this.setState({isMobile: true});
		} else if( this.state.isMobile && width > 1024 ) {
			this.setState({isMobile: false});
		}
	};

	render() {
		const {users, isLoaded, isGroup, groups} = this.props;
		return [
			<HeaderMenu key='header' />,
			<div className='container' key='content'>
				<Container>
					<Grid columns={this.state.isMobile ? this.state.media.mobile.row : this.state.media.desktop.row}>
						<Grid.Row className='body-column'>
							<Grid.Column
								width={this.state.isMobile ? this.state.media.mobile.columnWidthMain : this.state.media.desktop.columnWidthMain}>
								{
									isGroup
										?
										_map(users, ( group, key ) => (
											<UserTable key={key} data={group} isLoaded={isLoaded} isGroup={isGroup} groups={groups} currentGroup={key} />
										))
										:
										<UserTable data={users} isLoaded={isLoaded} title='Users' isGroup={isGroup} />
								}

							</Grid.Column>
							<Grid.Column
								width={this.state.isMobile ? this.state.media.mobile.columnWidthMenu : this.state.media.desktop.columnWidthMenu}>
								<Filter
									isMobile={this.state.isMobile}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
		];
	}
}

export default Users;