import React, {Fragment} from 'react';
import {Menu, Dropdown, Icon, Segment} from 'semantic-ui-react';
import Input from '../entries/input';
import Checkbox from '../entries/checkbox';

const Filter = ( {filterBy, setFilterOrder, filterOrder, setFilterSearch, searchQuery, isMobile, setGroup} ) => {

	const view = !isMobile ? {fluid: true, vertical: true, tabular: 'right'} : {fluid: true};

	return (
		<Fragment>
			{isMobile ?
				<Fragment>
					<Menu {...view} >
						<Dropdown item text='Filter'>
							<Dropdown.Menu>
								<Dropdown.Item name='all' active={filterBy === ''}
									onClick={setFilterOrder.bind(this)}>По умолчанию</Dropdown.Item>
								<Dropdown.Item name='firstName' active={filterBy === 'firstName'}
									onClick={setFilterOrder.bind(this, 'firstName')}><Icon
									name={filterOrder.firstName ? 'arrow up' : 'arrow down'} />Имя</Dropdown.Item>
								<Dropdown.Item name='lastName' active={filterBy === 'lastName'}
									onClick={setFilterOrder.bind(this, 'lastName')}><Icon
									name={filterOrder.lastName ? 'arrow up' : 'arrow down'} />Фамилия</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Menu.Item>
							<Input size='mini' icon='search' placeholder='Search user...' value={searchQuery}
								onChange={( {target: {value}} ) => setFilterSearch(value)} />
						</Menu.Item>
					</Menu>
					<Segment>
						<p><b>View</b></p>
						<Checkbox label='Group' onChange={() => setGroup()} />
					</Segment>
				</Fragment>
				:
				<Menu {...view} >
					<Menu.Item>
						<Menu.Header>Filter</Menu.Header>
					</Menu.Item>
					<Menu.Menu>
						<Menu.Item name='all' active={filterBy === ''} onClick={setFilterOrder.bind(this)}>
							По умолчанию
						</Menu.Item>
						<Menu.Item name='firstName' active={filterBy === 'firstName'}
							onClick={setFilterOrder.bind(this, 'firstName')}>
							<Icon name={filterOrder.firstName ? 'arrow up' : 'arrow down'} />Имя
						</Menu.Item>
						<Menu.Item name='lastName' active={filterBy === 'lastName'}
							onClick={setFilterOrder.bind(this, 'lastName')}>
							<Icon name={filterOrder.lastName ? 'arrow up' : 'arrow down'} />Фамилия
						</Menu.Item>
						<Menu.Item>
							<Input icon='search' placeholder='Search user...' value={searchQuery}
								onChange={( {target: {value}} ) => setFilterSearch(value)} />
						</Menu.Item>
					</Menu.Menu>
					<Menu.Item>
						<Menu.Header>Поиск</Menu.Header>
					</Menu.Item>
					<Menu.Menu>
						<Menu.Item>
							<Input icon='search' placeholder='Search user...' value={searchQuery}
								onChange={( {target: {value}} ) => setFilterSearch(value)} />
						</Menu.Item>
					</Menu.Menu>
					<Menu.Item>
						<Menu.Header>View</Menu.Header>
					</Menu.Item>
					<Menu.Menu>
						<Menu.Item>
							<Checkbox label='Group' onChange={() => setGroup()} />
						</Menu.Item>
					</Menu.Menu>
				</Menu>

			}
		</Fragment>
	)
};

export default Filter;