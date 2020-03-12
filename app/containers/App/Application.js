import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import MainTemplate from '../Templates/MainTemplate';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import {
	NotFound, HomePage, ExplorePage, WelcomePage,
	MessagePage, PressPage, ContactPage,
	Settings, HelpSupport, MatchsPage, ProfilePage
} from '../pageListAsync';

class Application extends React.Component {

	render() {
		const { changeMode, history, isAuthenticated } = this.props;
		
		return (
			<MainTemplate history={history} changeMode={changeMode}>
				<Switch>
					{ /* Menu pages */}
					<PrivateRoute exact path="/" authenticated={isAuthenticated} component={HomePage} />
					<PrivateRoute exact path="/welcome" authenticated={isAuthenticated} component={WelcomePage} />
					<PrivateRoute exact path="/matchs" authenticated={isAuthenticated} component={MatchsPage} />
					<PrivateRoute exact path="/explore" authenticated={isAuthenticated} component={ExplorePage} />
					<PrivateRoute exact path="/press" authenticated={isAuthenticated} component={PressPage} />
					<PrivateRoute exact path="/messages" authenticated={isAuthenticated} component={MessagePage} />
					<PrivateRoute exact path="/contacts" authenticated={isAuthenticated} component={ContactPage} />
					{/* User profile */}
					<PrivateRoute exact path="/Profile" authenticated={isAuthenticated} component={ProfilePage} />
					{/* Generic */}
					<PrivateRoute exact path="/settings" authenticated={isAuthenticated} component={Settings} />
					<PrivateRoute exact path="/help" authenticated={isAuthenticated} component={HelpSupport} />
					{ /* Default */}
					<Route component={NotFound} />
				</Switch>
			</MainTemplate>
		);
	}
}

Application.propTypes = {
	changeMode: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const reducer = 'auth';
const mapStateToProps = state => ({
	force: state, // force state from reducer
	isAuthenticated: state.getIn([reducer, 'isAuthenticated']),
});

const ApplicationMapped = connect(
	mapStateToProps,
)(Application);

export default withSnackbar(ApplicationMapped);
