import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './jss/contact-jss';

class Contact extends PureComponent {
	render() {
		const title = brand.name + ' - Contact';
		const description = brand.desc;
		const { classes } = this.props;
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
				<Grid container spacing={3} className={classes.root}>
					<h1>Contact page </h1>
				</Grid>
			</div>
		);
	}
}

Contact.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
