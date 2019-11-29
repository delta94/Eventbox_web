import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Ionicon from 'react-ionicons';
import Hidden from '@material-ui/core/Hidden';
import logo from 'dan-images/logo.svg';
import { ContentDivider } from '../../components/Divider';
import styles from 'dan-components/Forms/user-jss';
import { loginService } from '../../redux/services/authService';
import { ACCESS_TOKEN } from 'dan-api/apps/constants';


const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
	return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});
const loginBad = { variant: 'error', message: "Your Username or Password is incorrect. Please try again!" };
const loginFailled = { variant: 'error', message: "Sorry! Something went wrong. Please try again!" };

class Login extends React.Component {
	state = {
		showPassword: false,
		usernameOrEmail: { value: '' },
		password: { value: '' }
	}

	handleClickShowPassword = () => {
		const { showPassword } = this.state;
		this.setState({ showPassword: !showPassword });
	};

	handleMouseDownPassword = event => {
		event.preventDefault();
	};

	handleInputChange = event => {
		const target = event.target;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName]: {
				value: inputValue,
			}
		});
	}

	handleSubmit = event => {
		event.preventDefault();

		const loginRequest = {
			usernameOrEmail: this.state.usernameOrEmail.value,
			password: this.state.password.value
		};

		loginService(loginRequest)
			.then(response => {
				localStorage.setItem(ACCESS_TOKEN, response.accessToken);
				this.props.onLogin();
			}).catch(error => {
				if (error.status === 401) {
					this.props.enqueueSnackbar(loginBad.message, {
						variant: loginBad.variant,
						preventDuplicate: true,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center',
						},
					});
				} else {
					this.props.enqueueSnackbar(error.message || loginFailled.message, {
						variant: loginFailled.variant,
						preventDuplicate: true,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center',
						},
					});
				}
			});
	}

	render() {
		const title = brand.name + ' - Login';
		const description = brand.desc;
		const { classes } = this.props;
		const { showPassword, usernameOrEmail, password } = this.state;
		const deco = true;
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
										<Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
											<Ionicon className={classes.icon} icon="ios-open-outline" />
											Creer un nouveau compte
              							</Button>
									</div>
								</Hidden>
								<Typography variant="h4" className={classes.title} gutterBottom>
									Connexion
          						</Typography>
								<ContentDivider content="Avec votre email etudiant ou login" />
								<section className={classes.formWrap}>
									<form onSubmit={this.handleSubmit}>
										<div>
											<FormControl className={classes.formControl}>
												<TextField
													id="usernameOrEmail"
													name="usernameOrEmail"
													placeholder="Your Email or Login"
													label="Your Email or Login"
													required
													value={usernameOrEmail.value}
													className={classes.field}
													onChange={(event) => this.handleInputChange(event)}
													margin="normal"
												/>
											</FormControl>
										</div>
										<div>
											<FormControl className={classes.formControl}>
												<TextField
													id="password"
													name="password"
													type={showPassword ? 'text' : 'password'}
													label="Your Password"
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	aria-label="Toggle password visibility"
																	onClick={this.handleClickShowPassword}
																	onMouseDown={this.handleMouseDownPassword}
																>
																	{showPassword ? <VisibilityOff /> : <Visibility />}
																</IconButton>
															</InputAdornment>
														)
													}}
													required
													value={password.value}
													onChange={(event) => this.handleInputChange(event)}
													className={classes.field}
													margin="normal"
												/>
											</FormControl>
										</div>
										<div className={classes.optArea}>
											<FormControlLabel
												control={(
													<Checkbox
														name="checkbox"
														className={classes.field}
														color="primary"
													/>
												)}
												label="Se souvenir de moi"
											/>
											<Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>Forgot Password</Button>
										</div>
										<div className={classes.btnArea}>
											<Button variant="contained" color="primary" size="large" type="submit">
												Connexion
                  								<ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
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

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withSnackbar(Login));
