import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/Templates/jss/appStyles-jss';
import { ErrorWrap } from 'dan-components';

class NotFoundPage extends React.Component {
	render() {
		const { classes, gradient } = this.props;
		return (
			<div className={classNames(classes.appFrameOuter, gradient ? classes.gradientBg : classes.solidBg)}>
				<main className={classes.outerContent} id="mainContent">
					<div className={classes.petal} />
					<ErrorWrap title="404" desc="Oops, Page Not Found :(" />
				</main>
			</div>
		);
	}
}

NotFoundPage.propTypes = {
	classes: PropTypes.object.isRequired,
	gradient: PropTypes.bool.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
	gradient: state.getIn([reducer, 'gradient'])
});

const NotFoundDedicatedMaped = connect(
	mapStateToProps,
)(NotFoundPage);

export default (withStyles(styles)(NotFoundDedicatedMaped));
