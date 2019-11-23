import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loading from 'react-loading-bar';
import { create } from 'jss';
import { SnackbarProvider } from 'notistack';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'dan-styles/vendors/react-loading-bar/index.css';
import {
	changeModeAction,
} from 'dan-actions/UiActions';
import applicationTheme from '../../styles/theme/applicationTheme';

const styles = {
	root: {
		width: '100%',
		minHeight: '100%',
		marginTop: 0,
		zIndex: 1,
	},
};

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const AppContext = React.createContext();

class ThemeWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageLoaded: true,
			theme: createMuiTheme(applicationTheme(props.color, props.mode, props.direction)),
			palette: undefined,
		};
	}

	componentWillMount = () => {
		this.onProgressShow();
	}

	componentDidMount = () => {
		const { palette } = this.props;
		this.playProgress();
		this.setState({ palette });
	}

	componentWillUnmount() {
		this.onProgressShow();
	}

	onProgressShow = () => {
		this.setState({ pageLoaded: true });
	}

	onProgressHide = () => {
		this.setState({ pageLoaded: false });
	}

	playProgress = () => {
		this.onProgressShow();
		setTimeout(() => {
			this.onProgressHide();
		}, 500);
	}

	handleChangeMode = mode => {
		const { color, changeMode, direction } = this.props;
		this.setState({ theme: createMuiTheme(applicationTheme(color, mode, direction)) });
		changeMode(mode);
	};

	render() {
		const {
			classes,
			children,
		} = this.props;
		const { pageLoaded, theme } = this.state;
		return (
			<StylesProvider jss={jss}>
				<MuiThemeProvider theme={theme}>
					<div className={classes.root}>
						<Loading
							show={pageLoaded}
							color="rgba(255,255,255,.9)"
							showSpinner={false}
						/>

						<AppContext.Provider value={this.handleChangeMode}>
							<SnackbarProvider maxSnack={3}>
								{children}
							</SnackbarProvider>
						</AppContext.Provider>
					</div>
				</MuiThemeProvider>
			</StylesProvider>
		);
	}
}

ThemeWrapper.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	color: PropTypes.string.isRequired,
	mode: PropTypes.string.isRequired,
	direction: PropTypes.string.isRequired,
	palette: PropTypes.object.isRequired,
	changeMode: PropTypes.func.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
	force: state, // force state from reducer
	color: state.getIn([reducer, 'theme']),
	palette: state.getIn([reducer, 'palette']),
	mode: state.getIn([reducer, 'type']),
	direction: state.getIn([reducer, 'direction']),
});

const dispatchToProps = dispatch => ({
	changeMode: bindActionCreators(changeModeAction, dispatch),
});

const ThemeWrapperMapped = connect(
	mapStateToProps,
	dispatchToProps
)(ThemeWrapper);

export default withStyles(styles)(ThemeWrapperMapped);
