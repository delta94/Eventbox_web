import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import NotFound from 'containers/Generic/NotFound/NotFoundPage';
import Auth from './Auth';
import Application from './Application';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


class App extends React.Component {

	render() {
		return (
			<ThemeWrapper>
				<AppContext.Consumer>
					{(changeMode) => (
						<Switch>
							<Route
								exact
								path={['/', '/welcome', '/matchs', '/explore', '/messages', '/press', '/contacts', '/profile', '/settings', '/help']}
								render={(props) => <Application {...props} changeMode={changeMode} />}
							/>
							<Route
								exact
								path={['/login', '/register', '/register_success', '/invalid_token', '/validate_account']}
								render={(props) => <Auth {...props} />}
							/>
							<Route component={NotFound} />
						</Switch>
					)}
				</AppContext.Consumer>
			</ThemeWrapper>
		);
	}
}

export default withRouter(App);
