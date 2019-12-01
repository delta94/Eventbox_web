import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UpdateAboutForm from '../Forms/Steppers/UpdateAboutForm';
import Grid from '@material-ui/core/Grid';
import styles from './jss/profile-jss';

class UpdateAbout extends React.Component {
	render() {
		const {
			classes,
			submitProfile,
			inputChange,
		} = this.props;
		const branch = '';
		return (
			<div className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item md={2} lg={2} />
					<Grid item md={8} lg={8}>
						<Typography variant="subtitle1" className={classes.title}>A propos de moi</Typography>
						<UpdateAboutForm
							submitProfile={submitProfile}
							inputChange={inputChange}
						/>
					</Grid>
					<Grid item md={2} lg={2} />
				</Grid>
			</div>
		);
	}
}

UpdateAbout.propTypes = {
	classes: PropTypes.object.isRequired,
	submitProfile: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(UpdateAbout);
