import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import { HeaderMenu } from 'dan-components';
import dataMenu from 'dan-api/ui/menu';
import Decoration from '../Decoration';
import styles from '../jss/appStyles-jss';

class TopMenuLayout extends React.Component {
	render() {
		const {
			classes,
			children,
			pageLoaded,
			mode,
			gradient,
			deco,
			bgPosition,
			changeMode,
			history,
			toggleDrawer,
			sidebarOpen,
			loadTransition,
		} = this.props;
		return (
			<Fragment>
				<HeaderMenu
					dataMenu={dataMenu}
					changeMode={changeMode}
					mode={mode}
					history={history}
					toggleDrawerOpen={toggleDrawer}
					openMobileNav={sidebarOpen}
					loadTransition={loadTransition}
					logoLink="/"
				/>
				<main
					className={
						classNames(
							classes.content,
							classes.highMargin
						)
					}
					id="mainContent"
				>
					<Decoration
						mode={mode}
						gradient={gradient}
						decoration={deco}
						bgPosition={bgPosition}
						horizontalMenu
					/>
					<section className={classNames(classes.mainWrap, classes.topbarLayout)}>
						{!pageLoaded && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />)}
						<Fade
							in={pageLoaded}
							mountOnEnter
							unmountOnExit
							{...(pageLoaded ? { timeout: 700 } : {})}
						>
							<div className={!pageLoaded ? classes.hideApp : ''}>
								{/* Application content will load here */}
								{children}
							</div>
						</Fade>
					</section>
				</main>
			</Fragment>
		);
	}
}

TopMenuLayout.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	history: PropTypes.object.isRequired,
	changeMode: PropTypes.func.isRequired,
	toggleDrawer: PropTypes.func.isRequired,
	loadTransition: PropTypes.func.isRequired,
	sidebarOpen: PropTypes.bool.isRequired,
	pageLoaded: PropTypes.bool.isRequired,
	mode: PropTypes.string.isRequired,
	gradient: PropTypes.bool.isRequired,
	deco: PropTypes.bool.isRequired,
	bgPosition: PropTypes.string.isRequired,
};

export default (withStyles(styles)(TopMenuLayout));
