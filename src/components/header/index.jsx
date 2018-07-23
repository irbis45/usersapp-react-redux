import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Modal from '../../containers/Groups';


const HeaderMenu = ({addUser}) => {
	return (
		<Menu>
			<Menu.Item>
				<Link to='/'>Home</Link>
			</Menu.Item>

			<Menu.Menu position='right'>
				<Menu.Item>
					<Link to='/list_users'>User List</Link>
				</Menu.Item>

				<Modal addNewUser={addUser} size='mini' trigger={<Menu.Item name='help'>Add user</Menu.Item>} header='' />
			</Menu.Menu>
		</Menu>
	)
};

export default HeaderMenu;