import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import Send from '@material-ui/icons/Send';
import css from 'dan-styles/Form.scss';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import styles from '../jss/updateProfileForm-jss';

class UpdateAboutForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			openSnackBar: false,
			errorMessage: '',
			name: '',
			ufr: '',
			sex: '',
			phone: '',
		};
	}

	handleRequestCloseSnackBar = () => {
		this.setState({
			openSnackBar: false,
		});
	};

	handleUpdate = (name, ufr, sex, phone) => {
		const { submitProfile } = this.props;
		submitProfile(name, ufr, sex, phone);
	};

	render() {
		const { classes, inputChange, } = this.props;
		const { name, ufr, sex, phone, openSnackBar, errorMessage, } = this.state;
		
		return (
			<div>
				<form>
					<section className={css.bodyForm}>
						<div>
							<TextField
								id="name"
								name="name"
								label="Votre nom"
								className={classes.field}
								placeholder="Votre nom"
								value={name}
								onChange={(event) => inputChange(event, 'name')}
								margin="normal"
							/>
						</div>
						<div>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="ufr">Votre URF</InputLabel>
								<Select
									native
									name="ufr"
									value={ufr}
									onChange={(event) => inputChange(event, 'ufr')}
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
									value={sex}
									onChange={(event) => inputChange(event, 'sex')}
									inputProps={{ id: 'sex' }}
								>
									<option value="" />
									<option value={1}>Homme</option>
									<option value={2}>Femme</option>
								</Select>
							</FormControl>
						</div>
						<div>
							<TextField
								id="phone"
								label="Votre Telephone (optionel)"
								className={classes.field}
								placeholder="Votre Telephone (optionel)"
								value={phone}
								onChange={(event) => inputChange(event, 'phone')}
								margin="normal"
							/>
						</div>
					</section>
					<div className={classes.btnArea}>
						<Button
							variant="contained"
							color="secondary"
							type="button"
							disabled={!name || !ufr || !sex}
							onClick={() => this.handleUpdate(name, ufr, sex, phone)}
						>
							Update &nbsp; <Send className={classes.sendIcon} />
						</Button>
					</div>
				</form>
				<Snackbar
					open={openSnackBar}
					message={errorMessage}
					autoHideDuration={4000}
					onClose={this.handleRequestCloseSnackBar}
				/>
			</div>
		);
	}
}

UpdateAboutForm.propTypes = {
	classes: PropTypes.object.isRequired,
	submitProfile: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(UpdateAboutForm);
