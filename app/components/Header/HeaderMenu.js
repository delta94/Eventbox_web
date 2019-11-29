import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { NavLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Ionicon from 'react-ionicons';
import IconButton from '@material-ui/core/IconButton';
import logo from 'dan-images/logo.svg';
import brand from 'dan-api/dummy/brand';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import dummy from 'dan-api/dummy/dummyContents';
import MenuIcon from '@material-ui/icons/Menu';
import SidebarContent from '../Sidebar/SidebarContent';
import TopNavMenu from './TopNavMenu';
import UserMenu from './UserMenu';
import styles from './jss/header-jss';

const elem = document.documentElement;

class HeaderMenu extends React.Component {
	state = {
		status: dummy.user.status,
		anchorEl: null,
		fixed: false,
	};

	// Initial menu ui
	flagFixedMenu = false;

	componentDidMount = () => {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		const doc = document.documentElement;
		const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		const newFlagFixedMenu = (scroll > 64);
		if (this.flagFixedMenu !== newFlagFixedMenu) {
			this.setState({ fixed: newFlagFixedMenu });
			this.flagFixedMenu = newFlagFixedMenu;
		}
	}
	turnMode = mode => {
		const { changeMode } = this.props;
		if (mode === 'light') {
			changeMode('dark');
		} else {
			changeMode('light');
		}
	};

	handleOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleChangeStatus = status => {
		this.setState({ status });
		this.handleClose();
	}

	render() {
		const {
			classes,
			dataMenu,
			history,
			mode,
			toggleDrawerOpen,
			openMobileNav,
			loadTransition,
			isLogin,
			logoLink,
		} = this.props;
		const {
			status,
			anchorEl,
			fixed
		} = this.state;
		return (
			<AppBar
				className={
					classNames(
						classes.appBar,
						classes.attachedbar,
						fixed ? classes.fixed : ''
					)
				}
			>
				<div className={classes.appMenu}>
					<Hidden lgUp>
						<IconButton
							className={classes.menuButton}
							aria-label="Menu"
							onClick={toggleDrawerOpen}
						>
							<MenuIcon />
						</IconButton>
					</Hidden>
					<Hidden smDown>
						<div className={classes.headerProperties}>
							<div className={classNames(classes.headerAction, classes.invert)}>
								<Tooltip title="Turn Dark/Light" placement="bottom">
									<IconButton className={classes.button} onClick={() => this.turnMode(mode)}>
										<Ionicon icon="ios-bulb-outline" />
									</IconButton>
								</Tooltip>
								<Tooltip title="Help" placement="bottom">
									<IconButton className={classes.button}>
										<Ionicon icon="ios-help-circle-outline" />
									</IconButton>
								</Tooltip>
								<Tooltip title="Help" placement="bottom">
									<IconButton className={classes.button} href="/settings">
										<Ionicon icon="ios-settings-outline" />
									</IconButton>
								</Tooltip>
							</div>
						</div>
						<NavLink to={logoLink} className={classes.brand}>
							<img src={logo} alt={brand.name} />
							{brand.name}
						</NavLink>
					</Hidden>
					<Toolbar>
						<UserMenu dark />
					</Toolbar>
				</div>
				<Hidden mdDown>
					<Fragment>
						<TopNavMenu dataMenu={dataMenu} />
					</Fragment>
				</Hidden>
				<Hidden lgUp>
					<SwipeableDrawer
						onClose={toggleDrawerOpen}
						onOpen={toggleDrawerOpen}
						open={!openMobileNav}
						anchor="left"
					>
						<div className={classes.swipeDrawerPaper}>
							<SidebarContent
								drawerPaper
								leftSidebar
								toggleDrawerOpen={toggleDrawerOpen}
								loadTransition={loadTransition}
								dataMenu={dataMenu}
								status={status}
								anchorEl={anchorEl}
								openMenuStatus={this.handleOpen}
								closeMenuStatus={this.handleClose}
								changeStatus={this.handleChangeStatus}
								isLogin={isLogin}
							/>
						</div>
					</SwipeableDrawer>
				</Hidden>
			</AppBar>
		);
	}
}

HeaderMenu.propTypes = {
	classes: PropTypes.object.isRequired,
	dataMenu: PropTypes.array.isRequired,
	openMobileNav: PropTypes.bool.isRequired,
	mode: PropTypes.string.isRequired,
	changeMode: PropTypes.func.isRequired,
	toggleDrawerOpen: PropTypes.func.isRequired,
	loadTransition: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	logoLink: PropTypes.string,
	isLogin: PropTypes.bool
};

HeaderMenu.defaultProps = {
	isLogin: true,
	logoLink: '/',
};

export default withStyles(styles)(HeaderMenu);
