import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import styles from './jss/search-jss';

class SearchEvent extends React.Component {
	render() {
		const { classes, search } = this.props;
		return (
			<Toolbar>
				<div className={classes.flex}>
					<div className={classes.wrapper}>
						<div className={classes.search}>
							<SearchIcon />
						</div>
						<input className={classes.input} onChange={(event) => search(event)} placeholder="Search Event" />
					</div>
				</div>
			</Toolbar>
		);
	}
}

SearchEvent.propTypes = {
	classes: PropTypes.object.isRequired,
	search: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchEvent);
