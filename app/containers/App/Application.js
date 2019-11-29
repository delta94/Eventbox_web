import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import MainTemplate from '../Templates/MainTemplate';
import { ACCESS_TOKEN } from 'dan-api/apps/constants';
import { getCurrentUser } from '../../redux/services/userService';
import {
	NotFound, HomePage, ExplorePage,
	MessagePage, PressPage, ContactPage,
	Settings, HelpSupport, MatchsPage, ProfilePage
} from '../pageListAsync';

class Application extends React.Component {
	state = {
		currentUser: null,
		isAuthenticated: false,
		isLoading: false
	}

	loadCurrentUser = () => {
		this.setState({
			isLoading: true
		});
		getCurrentUser()
			.then(response => {
				this.setState({
					currentUser: response,
					isAuthenticated: true,
					isLoading: false
				});
			}).catch(error => {
				this.setState({
					isLoading: false
				});
			});
	}

	componentDidMount() {
		this.loadCurrentUser();
	}

	//=========== handling logout ===============
	handleLogout = () => {
		localStorage.removeItem(ACCESS_TOKEN);

		const redirectTo = "/login";
		const notificationType = "success";
		const description = "You're successfully logged out."

		this.setState({
			currentUser: null,
			isAuthenticated: false
		});

		this.props.history.push(redirectTo);

		this.props.enqueueSnackbar(description, {
			variant: notificationType,
			preventDuplicate: true,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center',
			},
		});
	}


	render() {
		const { changeMode, history } = this.props;
		const { currentUser, isAuthenticated, isLoading } = this.state;
		return (
			<MainTemplate history={history} changeMode={changeMode}>
				{console.log(currentUser)}
				<Switch>
					{ /* Menu pages */}
					<Route exact path="/" component={HomePage} />
					<Route exact path="/matchs" component={MatchsPage} />
					<Route exact path="/explore" component={ExplorePage} />
					<Route exact path="/press" component={PressPage} />
					<Route exact path="/messages" component={MessagePage} />
					<Route exact path="/contacts" component={ContactPage} />
					{/* User profile */}
					<Route exact path="/Profile" component={ProfilePage} />
					{/* Generic */}
					<Route exact path="/settings" component={Settings} />
					<Route exact path="/help" component={HelpSupport} />
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
};

export default withSnackbar(Application);
