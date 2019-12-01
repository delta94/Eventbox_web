import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import { PropTypes } from 'prop-types';
import {
	Login,
	Register,
	ResetPassword,
	ComingSoon,
	Maintenance,
	NotFound,
	RegisterSuccess,
	InvalidToken,
	ValidateAccount,
} from '../pageListAsync';

class Auth extends React.Component {

	render() {
		const { handleLogin } = this.props;
		return (
			<Outer>
				<Switch>
					<Route exact path="/login" render={(props) => <Login onLogin={handleLogin} {...props} />} />
					<Route path="/register" component={Register} />
					<Route path="/reset_password" component={ResetPassword} />
					<Route path="/register_success" component={RegisterSuccess} />
					<Route path="/invalid_token" component={InvalidToken} />
					<Route path="/validate_account" component={ValidateAccount} />
					<Route path="/maintenance" component={Maintenance} />
					<Route path="/coming-soon" component={ComingSoon} />
					<Route component={NotFound} />
				</Switch>
			</Outer>
		);
	}
}
Auth.propTypes = {
	handleLogin: PropTypes.func.isRequired,
};

export default Auth;
