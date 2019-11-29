import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import brand from 'dan-api/dummy/brand';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Ionicon from 'react-ionicons';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Hidden from '@material-ui/core/Hidden';
import logo from 'dan-images/logo.svg';
import { ContentDivider } from '../../components/Divider';
import styles from 'dan-components/Forms/user-jss';
import { registerService, checkUsernameAvailability, checkEmailAvailability } from '../../redux/services/authService';
import {
	USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
	EMAIL_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from 'dan-actions/actionConstants';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
	return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

const registerOK = { variant: 'success', message: "Thank you! You're successfully registered. Please Login to continue!" };
const registerFailled = { variant: 'error', message: "Sorry! Something went wrong. Please try again!" };

class Register extends React.Component {
	state = {
		username: { value: '' },
		email: { value: '' },
		password: { value: '' }
	}

	//=============== handle form input change ==========
	handleInputChange = (event, validationFun) => {
		const target = event.target;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName]: {
				value: inputValue,
				...validationFun(inputValue)
			}
		});
	}
	//================ handle form submit ==========
	handleSubmit = event => {
		event.preventDefault();

		const registerRequest = {
			email: this.state.email.value,
			username: this.state.username.value,
			password: this.state.password.value
		};

		registerService(registerRequest)
			.then(response => {
				this.props.enqueueSnackbar(registerOK.message, {
					variant: registerOK.variant,
					preventDuplicate: true,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
				this.props.history.push("/login");
			}).catch(error => {
				this.props.enqueueSnackbar(error.message || registerFailled.message, {
					variant: registerFailled.variant,
					preventDuplicate: true,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			});
	}
	// ========= validation function =========
	isFormInvalid = () => {
		return !(
			this.state.username.validateStatus === true &&
			this.state.email.validateStatus === true &&
			this.state.password.validateStatus === true
		);
	}

	validateEmail = email => {
		if (!email) {
			return { validateStatus: false, errorMsg: 'Email may not be empty' }
		}

		const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
		if (!EMAIL_REGEX.test(email)) {
			return { validateStatus: false, errorMsg: 'Email not valid' }
		}

		if (email.length > EMAIL_MAX_LENGTH) {
			return { validateStatus: false, errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)` }
		}

		return { validateStatus: null, errorMsg: null }
	}

	validateUsername = username => {
		if (username.length < USERNAME_MIN_LENGTH) {
			return { validateStatus: false, errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)` }
		} else if (username.length > USERNAME_MAX_LENGTH) {
			return { validationStatus: false, errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)` }
		} else {
			return { validateStatus: null, errorMsg: null }
		}
	}

	validatePassword = password => {
		if (password.length < PASSWORD_MIN_LENGTH) {
			return { validateStatus: false, errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)` }
		} else if (password.length > PASSWORD_MAX_LENGTH) {
			return { validationStatus: false, errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)` }
		} else {
			return { validateStatus: true, errorMsg: null, };
		}
	}

	validateUsernameAvailability = () => {
		// First check for client side errors in username
		const usernameValue = this.state.username.value;
		const usernameValidation = this.validateUsername(usernameValue);

		if (usernameValidation.validateStatus === false) {
			this.setState({ username: { value: usernameValue, ...usernameValidation } });
			return;
		}

		this.setState({ username: { value: usernameValue, validateStatus: false, errorMsg: null } });

		checkUsernameAvailability(usernameValue)
			.then(response => {
				if (response.available) {
					this.setState({ username: { value: usernameValue, validateStatus: true, errorMsg: null } });
				} else {
					this.setState({ username: { value: usernameValue, validateStatus: false, errorMsg: 'This username is already taken' } });
				}
			}).catch(error => {
				// Marking validateStatus as success, Form will be recchecked at server
				this.setState({ username: { value: usernameValue, validateStatus: true, errorMsg: null } });
			});
	}

	validateEmailAvailability = () => {
		// First check for client side errors in email
		const emailValue = this.state.email.value;
		const emailValidation = this.validateEmail(emailValue);

		if (emailValidation.validateStatus === false) {
			this.setState({ email: { value: emailValue, ...emailValidation } });
			return;
		}

		this.setState({ email: { value: emailValue, validateStatus: false, errorMsg: null } });

		checkEmailAvailability(emailValue)
			.then(response => {
				if (response.available) {
					this.setState({ email: { value: emailValue, validateStatus: true, errorMsg: null } });
				} else {
					this.setState({ email: { value: emailValue, validateStatus: false, errorMsg: 'This Email is already registered' } });
				}
			}).catch(error => {
				// Marking validateStatus as success, Form will be recchecked at server
				this.setState({ email: { value: emailValue, validateStatus: true, errorMsg: null } });
			});
	}


	render() {
		const title = brand.name + ' - Register';
		const description = brand.desc;
		const { classes } = this.props;
		const deco = true;
		const { username, email, password } = this.state;
		return (
			<div className={classes.root}>
				<Helmet>
					<title>{title}</title>
					<meta name="description" content={description} />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="twitter:title" content={title} />
					<meta property="twitter:description" content={description} />
				</Helmet>
				<div className={classes.container}>
					<div className={classes.userFormWrap}>
						<Fragment>
							<Hidden mdUp>
								<NavLink to="/" className={classNames(classes.brand, classes.outer)}>
									<img src={logo} alt={brand.name} />
									{brand.name}
								</NavLink>
							</Hidden>
							<Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
								<Hidden smDown>
									<div className={classes.topBar}>
										<NavLink to="/" className={classes.brand}>
											<img src={logo} alt={brand.name} />
											{brand.name}
										</NavLink>
										<Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
											<Ionicon className={classes.icon} icon="ios-open-outline" />
											Already have account ?
              							</Button>
									</div>
								</Hidden>
								<Typography variant="h4" className={classes.title} gutterBottom>
									Register
          						</Typography>
								<ContentDivider content="Avec votre email etudiant" />
								<section className={classes.formWrap}>
									<form onSubmit={this.handleSubmit}>
										<div>
											<FormControl className={classes.formControl}>
												<TextField
													id="username"
													name="username"
													label="Username"
													className={classes.field}
													placeholder="Username"
													error={username.validateStatus}
													helperText={username.errorMsg}
													value={username.value}
													onBlur={this.validateUsernameAvailability}
													onChange={(event) => this.handleInputChange(event, this.validateUsername)}
													required
													margin="normal"
												/>
											</FormControl>
										</div>
										<div>
											<FormControl className={classes.formControl}>
												<TextField
													id="email"
													name="email"
													label="Your email"
													className={classes.field}
													placeholder="Your email"
													error={email.validateStatus}
													helperText={email.errorMsg}
													value={email.value}
													onBlur={this.validateEmailAvailability}
													onChange={(event) => this.handleInputChange(event, this.validateEmail)}
													required
													margin="normal"
												/>
											</FormControl>
										</div>
										<div>
											<FormControl className={classes.formControl}>
												<TextField
													id="password"
													name="password"
													type="password"
													label="Your Password"
													className={classes.field}
													error={password.validateStatus}
													helperText={password.errorMsg}
													value={password.value}
													onChange={(event) => this.handleInputChange(event, this.validatePassword)}
													required
													margin="normal"
												/>
											</FormControl>
										</div>
										<div>
											<FormControl className={classes.formControl}>
												<TextField
													id="passwordConfirm"
													name="passwordConfirm"
													type="password"
													label="Re-type password"
													className={classes.field}
													required
													margin="normal"
												/>
											</FormControl>
										</div>
										<div>
											<FormControlLabel
												control={(
													<Checkbox
														name="checkbox"
														required
														className={classes.field}
														color="primary"
													/>
												)}
												label="Agree with"
											/>
											<a href="#" className={classes.link}>Terms &amp; Condition</a>
										</div>
										<div className={classes.btnArea}>
											<Button variant="contained" color="primary" type="submit">
												Inscription
                    							<ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={this.isFormInvalid()} />
											</Button>
										</div>
									</form>
								</section>
							</Paper>
						</Fragment>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(withSnackbar(Register));
