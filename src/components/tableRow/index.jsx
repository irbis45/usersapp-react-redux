import React from 'react';
import {Table} from 'semantic-ui-react';

const Row = ( user ) => {

	const {firstName, lastName, groupTitle, isGroup} = user;

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
				<Table.Cell collapsing>Группа: {groupTitle || 'отсутствует'}</Table.Cell>
			}

		</Table.Row>
	)
};

export default Row;