import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import PaperBlock from '../../components/Paper/PaperBlock';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { updateUserWithPatch } from '../../redux/services/userService';
import styles from './jss/home-jss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	'SPORT',
	'PARTY',
	'EDUCATION',
	'TRAVEL',
	'SOCIAL',
	'MUSIC',
	'DEBAT',
];

const updateBad = { variant: 'error', message: 'update info is bad' };
const updateOk = { variant: 'success', message: 'update success' };

class Welcome extends PureComponent {
	state = {
		lastName: { value: "" },
		firstName: { value: "" },
		ufr: { value: "" },
		sex: { value: "" },
		phone: { value: "" },
		interest: { value: [] },
	};

	//============== handle update about submit ===========
	handleInputChange = (event) => {
		const { target } = event;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName]: {
				value: inputValue,
			}
		});
	}

	deleteEmptyField = obj => {
		for (var prop in obj) {
			if (obj[prop] === null || obj[prop] === '' || obj[prop] === undefined || obj[prop] === []) {
				delete obj[prop];
			}
		}
		return obj;
	}

	handleUpdate = event => {
		event.preventDefault();

		//const username = this.props.location.state.currentUser.username;

		var userRequest = {
			firstName: this.state.firstName.value,
			lastName: this.state.lastName.value,
			ufr: this.state.ufr.value,
			sex: this.state.sex.value,
			phone: this.state.phone.value,
			interests: this.state.interest.value,
		}

		userRequest = this.deleteEmptyField(userRequest);

		console.log(userRequest);

		/*updateUserWithPatch(username, userRequest)
			.then(response => {
				this.props.enqueueSnackbar(updateOk.message, {
					variant: updateOk.variant,
					preventDuplicate: true,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
				this.props.history.push({
					pathname: '/matchs',
				});
			}).catch(error => {
				this.props.enqueueSnackbar(error.message || updateBad.message, {
					variant: updateBad.variant,
					preventDuplicate: true,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			});*/
	};


	render() {
		const title = brand.name + ' - Welcomee';
		const description = brand.desc;
		const { classes } = this.props;
		const { firstName, lastName, ufr, sex, phone, interest } = this.state;

		return (
			<div>
				<Helmet>
					<title>{title}</title>
					<meta name="description" content={description} />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="twitter:title" content={title} />
					<meta property="twitter:description" content={description} />
				</Helmet>
				<Grid container spacing={3}>
					<Grid item md={2} lg={2} />
					<Grid item md={8} lg={8}>
						<PaperBlock
							title="Welcome Rivel"
							icon="ios-contact" whiteBg
							desc="Afin de bien profiter d'eventbox, veillez completer votre profile"
						>
							<Grid container spacing={4}>
								<Grid item md={2} lg={2} />
								<Grid item md={8} lg={8}>
									<form onSubmit={(event) => this.handleUpdate(event)}>
										<section className={classes.formSection}>
											<div>
												<Grid container spacing={4}>
													<Grid item sm={6} md={6} lg={6}>
														<TextField
															id="firstName"
															name="firstName"
															label="Votre prenom"
															className={classes.field}
															placeholder="Votre prenom"
															value={firstName.value}
															onChange={(event) => this.handleInputChange(event)}
															margin="normal"
															
														/>
													</Grid>
													<Grid item sm={6} md={6} lg={6}>
														<TextField
															id="lastName"
															name="lastName"
															label="Votre nom"
															className={classes.field}
															placeholder="Votre nom"
															value={lastName.value}
															onChange={(event) => this.handleInputChange(event)}
															margin="normal"
														/>
													</Grid>
												</Grid>

											</div>
											<div>
												<FormControl className={classes.formControl}>
													<InputLabel htmlFor="ufr">Votre URF</InputLabel>
													<Select
														native
														name="ufr"
														value={ufr.value}
														onChange={(event) => this.handleInputChange(event)}
														inputProps={{ id: 'ufr' }}
														
													>
														<option value="" />
														<option value="DSP">UFR Droit et Science Politique (DSP)</option>
														<option value="LCE">UFR Langues et Cultures Etrangeres</option>
														<option value="PHILLIA">UFR Philosophie, Information-Communication, Langage, Litterature, Arts du spectacle</option>
														<option value="SEGMI">UFR Sciences Economique, Gestion, Mathematique, Informatique</option>
														<option value="SITEC">UFR Systemes Industriels et Techniques de Communication</option>
														<option value="SPSE">UFR Sciences Psychologiques et Sciences de l'Education</option>
														<option value="SSA">UFR Sciences Sociales et Administration</option>
														<option value="STAPS">UFR Sciences et Techniques des Activites Physiques et Sportives</option>
														<option value="IPAG">Institut de Preparation a l'Administration Generale</option>
													</Select>
												</FormControl>
											</div>
											<div>
												<FormControl className={classes.formControl}>
													<InputLabel htmlFor="sex">Votre sexe</InputLabel>
													<Select
														native
														name="sex"
														value={sex.value}
														onChange={(event) => this.handleInputChange(event)}
														inputProps={{ id: 'sex' }}
														
													>
														<option value="" />
														<option value={1}>Homme</option>
														<option value={2}>Femme</option>
													</Select>
												</FormControl>
											</div>
											<div>
												<FormControl className={classes.formControl}>
													<InputLabel id="interest">Interest</InputLabel>
													<Select
														labelId="interest"
														id="interest"
														name="interest"
														multiple
														value={interest.value}
														onChange={(event) => this.handleInputChange(event)}
														input={<Input />}
														renderValue={selected => selected.join(', ')}
														MenuProps={MenuProps}
													>
														{names.map(name => (
															<MenuItem key={name} value={name}>
																<Checkbox checked={interest.value.indexOf(name) > -1} />
																<ListItemText primary={name} />
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</div>
											<div>
												<TextField
													id="phone"
													name="phone"
													label="Votre phone (optionel)"
													className={classes.field}
													placeholder="Votre phone"
													value={phone.value}
													onChange={(event) => this.handleInputChange(event)}
													margin="normal"
												/>
											</div>
										</section>
										<div className={classes.btnArea}>
											<Button
												variant="contained"
												color="primary"
												type="submit"
											>
												Save and enjoy &nbsp; <Send className={classes.sendIcon} />
											</Button>
										</div>
									</form>
								</Grid>
								<Grid item md={2} lg={2} />
							</Grid>
						</PaperBlock>
					</Grid>
					<Grid item md={2} lg={2} />
				</Grid>
			</div>
		);
	}
}

Welcome.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withSnackbar(Welcome));
