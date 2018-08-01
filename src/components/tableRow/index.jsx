import React from 'react';
import {Table} from 'semantic-ui-react';

const Row = ( user ) => {

	const {firstName, lastName, group, isGroup} = user;

	return (
		<Table.Row>
			<Table.Cell collapsing>
				{lastName}
			</Table.Cell>
			<Table.Cell collapsing>
				{firstName}
			</Table.Cell>
			{
				!isGroup
				&&
				<Table.Cell collapsing>Группа: {group ? group.title : 'отсутствует'}</Table.Cell>
			}

		</Table.Row>
	)
};

export default Row;