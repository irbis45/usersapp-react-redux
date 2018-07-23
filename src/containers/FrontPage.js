import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../actions/user';
import FrontPage from '../pages/front';

const mapStateToProps = ( ) => ({});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
