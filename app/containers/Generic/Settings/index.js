import React from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DetailSettings from './DetailSettings';
import styles from './jss/settings-jss';

class Settings extends React.Component {
	state = {
		open: false,
		checked: ['switch', 'check2'],
		keyword: '',
		settingTitle: 'Settings'
	};

	handleToggle = value => () => {
		const { checked } = this.state;
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({
			checked: newChecked,
		});
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleClickOpen = (title) => {
		this.setState({ open: true, settingTitle: title });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSearch = event => {
		this.setState({ keyword: event.target.value.toLowerCase() });
	}

	render() {
		const title = brand.name;
		const description = brand.desc;
		const { classes } = this.props;
		const { keyword, open, settingTitle } = this.state;
		return (
			<div>
				<Helmet>
					<title>{title} - Settings</title>
					<meta name="description" content={description} />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="twitter:title" content={title} />
					<meta property="twitter:description" content={description} />
				</Helmet>

				<Grid container>
					<Grid item md={2} />
					<Grid item md={8} >
						<Paper className={classes.root} elevation={4}>
							<AppBar position="static" color="inherit" className={classes.searchSettings}>
								<Toolbar>
									<div className={classes.flex}>
										<div className={classes.wrapper}>
											<div className={classes.search}>
												<SearchIcon />
											</div>
											<input className={classes.input} placeholder="Find a settings" onChange={(event) => this.handleSearch(event)} />
										</div>
									</div>
								</Toolbar>
							</AppBar>
							<section className={classes.settingList}>
								<Grid container spacing={2}>
									<Grid item sm={4} xs={12}>
										<Button color="secondary" className={classes.button}>
											<Icon className={classes.icon}>chrome_reader_mode</Icon>
											<span className={classes.text}>
												General
												<Typography variant="caption" className={classes.info}>
													Configuration du template
												</Typography>
											</span>
										</Button>
									</Grid>
									<Grid item sm={4} xs={12}>
										<Button color="secondary" className={classes.button}>
											<Icon className={classes.icon}>person</Icon>
											<span className={classes.text}>
												Compte
												<Typography variant="caption" className={classes.info}>
													Configuration du compte
												</Typography>
											</span>
										</Button>
									</Grid>
								</Grid>
							</section>
						</Paper>
					</Grid>
					<Grid item md={2} />
				</Grid>

				<DetailSettings open={open} handleClose={this.handleClose} title={settingTitle} />
			</div>
		);
	}
}

Settings.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
