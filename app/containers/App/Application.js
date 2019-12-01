import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import MainTemplate from '../Templates/MainTemplate';
import {
	NotFound, HomePage, ExplorePage, WelcomePage,
	MessagePage, PressPage, ContactPage,
	Settings, HelpSupport, MatchsPage, ProfilePage
} from '../pageListAsync';

class Application extends React.Component {

	render() {
		const { changeMode, history } = this.props;
		
		return (
			<MainTemplate history={history} changeMode={changeMode}>
				<Switch>
					{ /* Menu pages */}
					<Route exact path="/" component={HomePage} />
					<Route exact path="/welcome" component={WelcomePage} />
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
