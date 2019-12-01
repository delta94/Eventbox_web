import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Ionicon from 'react-ionicons';
import Grid from '@material-ui/core/Grid';
import styles from './jss/home-jss';
import HorizontalLinear from './Stepper/HorizontalLinear';
import {
	PaperBlock,
} from 'dan-components';

class Welcome extends PureComponent {
	render() {
		const title = brand.name + ' - Welcomee';
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
				<Grid container spacing={3}>
					<Grid item md={2} lg={2} />
					<Grid item md={8} lg={8}>
						<PaperBlock
							title="Welcome Rivel"
							icon="ios-contact" whiteBg
							desc="Afin de bien profiter d'eventbox, veillez completer votre profile"
						>
							<HorizontalLinear />
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

export default withStyles(styles)(Welcome);
