import React from 'react';
import {Table} from 'semantic-ui-react';
import _map from 'lodash/map';
import _find from 'lodash/find';

import TableRow from '../tableRow';

const MyTable = ({data, isLoaded, title, isGroup, groups, currentGroup}) => {

	if (title === undefined) {
		const group = _find(groups, o => o._id === currentGroup);
		title = group ? group.title : 'Без группы';
	}

	return (
		<Table celled striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan='3'>{title}</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{
					isLoaded
						&& _map(data, user => (
							<TableRow
								key={user.id}
								isGroup={isGroup}
								{...user}
							/>
						))
				}
			</Table.Body>
		</Table>
	)
};

export default MyTable;