import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import NotFound from 'containers/Generic/NotFound/NotFoundPage';
import Auth from './Auth';
import Application from './Application';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
import PrivateRoute from './PrivateRoute';
import { ACCESS_TOKEN } from 'dan-api/apps/constants';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


class App extends React.Component {
	state = {
		currentUser: null,
		isAuthenticated: false,
		isLoading: false
	}

	//=========== handling login ===========
	handleLogin = (user) => {
		this.setState({currentUser: user});
		const isActive = this.state.currentUser.isActive;
		const interests = this.state.currentUser.interests;
		if (!isActive) {
			this.setState({isAuthenticated: false});
			this.props.history.push('/validate_account');
		} else if(interests.length === 0) {
			this.setState({isAuthenticated: true});
			this.props.history.push('/welcome');
		} else {
			this.setState({isAuthenticated: true});
			this.props.history.push('/');
		}
		
	}

	//=========== handling logout ===============
	handleLogout = () => {
		localStorage.removeItem(ACCESS_TOKEN);

		const redirectTo = "/login";

		this.setState({
			currentUser: null,
			isAuthenticated: false
		});

		this.props.history.push(redirectTo);
	}

  render() {
	const { currentUser, isAuthenticated, isLoading } = this.state;
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {(changeMode) => (
            <Switch>
              <Route
                exact
                path={['/', '/welcome', '/matchs', '/explore', '/messages', '/press', '/contacts', '/profile', '/settings', '/help']}
                render={(props) => <Application {...props} changeMode={changeMode} currentUser={currentUser} />}
              />
              <Route
                exact
                path={['/login', '/register', '/register_success', '/invalid_token', '/validate_account']}
                render={(props) => <Auth {...props} handleLogin={this.handleLogin} />}
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
