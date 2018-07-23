import Header from '../components/header';
import {bindActionCreators} from 'redux';
import * as usersActions from '../actions/user';

import {connect} from 'react-redux';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
