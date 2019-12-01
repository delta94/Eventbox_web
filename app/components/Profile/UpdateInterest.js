import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SelectSuggestionTags from '../Forms/Steppers/SelectSuggestionTags';
import Grid from '@material-ui/core/Grid';
import styles from './jss/profile-jss';

class UpdateInterest extends React.Component {
	render() {
		const {
			classes,
		} = this.props;
		const branch = '';
		return (
			<div className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item md={2} lg={2} />
					<Grid item md={8} lg={8}>
						<Typography variant="subtitle1" className={classes.title}>Mes centre d'interets</Typography>
						<SelectSuggestionTags />
					</Grid>
					<Grid item md={2} lg={2} />
				</Grid>
			</div>
		);
	}
}

UpdateInterest.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateInterest);
