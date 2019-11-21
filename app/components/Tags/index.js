import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './jss/tags-jss';

class Tags extends React.Component {

	render() {
		const {classes, tagData} = this.props;

		return (
			<Paper className={classes.root}>
				<p>Vos interets</p>
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
}

export default withStyles(styles)(Tags);