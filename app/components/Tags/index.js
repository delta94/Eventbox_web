import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Edit from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import styles from './jss/tags-jss';

class Tags extends React.Component {

	render() {
		const { classes, tagData, title, showBtn } = this.props;

		return (
			<Paper className={classes.root}>
				<Typography variant="subtitle1" className={classes.title}>
					{title} {showBtn && (<IconButton className={classes.updateBtn} color="primary"> <Edit /> </IconButton>)}
				</Typography>
				<Divider className={classes.divider} />
				<ul className={classes.cloud}>
					{tagData.map((item, index) => (
						<li key={index.toString()}>{item}</li>
					))}
				</ul>
			</Paper>
		)
	}
}

Tags.propTypes = {
	classes: PropTypes.object.isRequired,
	tagData: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	showBtn: PropTypes.bool,
}

Tags.defaultProps = {
	showBtn: false,
};

export default withStyles(styles)(Tags);