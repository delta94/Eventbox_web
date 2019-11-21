import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './jss/paperStyle-jss';

class PaperSheet extends React.Component {
	render() {
		const {
			classes,
			children,
			whiteBg,
			noMargin,
			colorMode,
			overflowX,
		} = this.props;
		return (
			<div>
				<Paper className={classNames(classes.root, noMargin && classes.noMargin, colorMode && classes.colorMode)} elevation={0}>
					<section className={classNames(classes.content, whiteBg && classes.whiteBg, overflowX && classes.overflowX)}>
						{children}
					</section>
				</Paper>
			</div>
		);
	}
}

PaperSheet.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	whiteBg: PropTypes.bool,
	colorMode: PropTypes.bool,
	noMargin: PropTypes.bool,
	overflowX: PropTypes.bool,
};

PaperSheet.defaultProps = {
	whiteBg: false,
	noMargin: false,
	colorMode: false,
	overflowX: false,
};

export default compose(withStyles(styles))(PaperSheet);