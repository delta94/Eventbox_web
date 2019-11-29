import React from 'react';
import { withSnackbar } from 'notistack';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  Login,
  Register,
  ResetPassword,
  ComingSoon,
  Maintenance,
  NotFound,
  RegisterSuccess,
  InvalidToken,
} from '../pageListAsync';

class Auth extends React.Component {
	handleLogin = () => {
	  const description = "You're successfully logged in.";
	  const notificationType = 'success';

	  this.props.enqueueSnackbar(description, {
	    variant: notificationType,
	    preventDuplicate: true,
	    anchorOrigin: {
	      vertical: 'top',
	      horizontal: 'center',
	    },
	  });
	  this.props.history.push('/');
	}

	render() {
	  return (
  <Outer>
  <Switch>
  <Route exact path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
  <Route path="/register" component={Register} />
  <Route path="/reset_password" component={ResetPassword} />
  <Route path="/register_success" component={RegisterSuccess} />
  <Route path="/invalid_token" component={InvalidToken} />
  <Route path="/maintenance" component={Maintenance} />
  <Route path="/coming-soon" component={ComingSoon} />
  <Route component={NotFound} />
	      </Switch>
	    </Outer>
	  );
	}
}

export default withSnackbar(Auth);
