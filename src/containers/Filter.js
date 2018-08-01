import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as filterActions from '../actions/filter';

import Filter from '../components/filterMenu'

const mapStateToProps = ( {filter} ) => ({
	setFilterSearch: filter.setFilterSearch,
	filterBy       : filter.filterBy,
	filterOrder    : filter.filterOrder,
	isGroup        : filter.isGroup
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(filterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
