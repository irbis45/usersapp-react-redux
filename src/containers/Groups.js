import {connect} from 'react-redux';

import Modal from '../components/modalUserCreate'
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/group';
import * as userActions from '../actions/user';

const mapStateToProps = ( {group} ) => ({
	groups  : group.items,
	isLoaded: group.isLoaded
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(groupActions, dispatch),
	...bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
