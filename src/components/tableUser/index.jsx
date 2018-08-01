import React from 'react';
import {Table} from 'semantic-ui-react';
import _map from 'lodash/map';

import TableRow from '../tableRow';

const MyTable = ({data, isLoaded, title, isGroup}) => {

	let colspan = 3;

	if (title === undefined) {
		title = data[0].group ? data[0].group.title : 'Без группы';
		colspan = 2;
	}

	return (
		<Table striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan={colspan}>{title}</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{
					isLoaded
						&& _map(data, user => (
							<TableRow
								key={user._id}
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