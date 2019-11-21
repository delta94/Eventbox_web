import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CreateEventForm from '../Forms/CreateEventForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './jss/createEvent-jss';

class CreateEvent extends React.Component {
	render() {
		const {
			classes,
			open,
			closeForm,
			submitEvent,
			privacy,
			title,
			inputChange,
			compose
		} = this.props;
		const branch = '';
		return (
			<div>
				<Button variant="contained" onClick={compose} color="secondary" fullWidth className={classes.createBtn}>
					<Add /> &nbsp;Creer un nouveau event
          		</Button>
				<Tooltip title="Create new event">
					<Fab color="secondary" onClick={() => compose()} className={classes.addBtn}>
						<Add />
					</Fab>
				</Tooltip>
				<FloatingPanel
					openForm={open}
					branch={branch}
					closeForm={closeForm}
					title="Create new event"
					extraSize
				>
					<CreateEventForm
						title={title}
						privacy={privacy}
						submitEvent={submitEvent}
						closeForm={closeForm}
						inputChange={inputChange}
					/>
				</FloatingPanel>
			</div>
		);
	}
}

CreateEvent.propTypes = {
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	privacy: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	compose: PropTypes.func.isRequired,
	closeForm: PropTypes.func.isRequired,
	submitEvent: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(CreateEvent);
