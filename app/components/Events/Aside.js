import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Footer from '../Footer';
import Tags from '../Tags';
import CreateEventForm from '../Forms/CreateEventForm';
import {createEvent} from '../../redux/services/eventService';
import {
	composeAction,
	discardAction,
} from 'dan-actions/EventActions';

const createFailled = { variant: 'error', message: 'event info is bad' };
const createSuccess = { variant: 'success', message: 'event created with success' };

class Aside extends React.Component {

	handleSubmit = (file, title, description, location, category, startTime, endTime) => {

		const organizerId = this.props.currentUser.id;

		createEvent(file, title, description, location, category, startTime, endTime, organizerId)
			.then(response => {
				console.log(response);
				this.setState({
					createdEventId: response.eventId,
					organizerId: response.organizerId,
				});
				this.props.enqueueSnackbar(createSuccess.message, {
					variant: createSuccess.variant,
					preventDuplicate: true,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			}).catch(error => {
				this.props.enqueueSnackbar(error.message || createFailled.message, {
					variant: createFailled.variant,
					preventDuplicate: true,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			});
	}

	handleCompose = () => {
		const { compose } = this.props;
		compose();
	}

	render() {
		const {
			openForm,
			discard,
		} = this.props;
		return (
			<div>
				<CreateEventForm
					compose={this.handleCompose}
					open={openForm}
					closeForm={discard}
					submitEvent={this.handleSubmit}
				/>
				<Tags
					title="Interets"
					tagData={['Sport', 'Education', 'Social', 'Language', 'Party']}
				/>
				<Footer title="Langues" />
			</div>
		)
	}
}

Aside.propTypes = {
	discard: PropTypes.func.isRequired,
	openForm: PropTypes.bool.isRequired,
	currentUser: PropTypes.object.isRequired,
}

const reducerEvents = 'events';
const reducerAuth = 'auth';
const mapStateToProps = state => ({
	force: state, // force state from reducer
	openForm: state.getIn([reducerEvents, 'openForm']),
	messageNotif: state.getIn([reducerEvents, 'notifMsg']),
	currentUser: state.getIn([reducerAuth, 'user']),
});

const constDispatchToProps = dispatch => ({
	compose: () => dispatch(composeAction),
	discard: () => dispatch(discardAction),
	closeNotif: () => dispatch(closeNotifAction),
});

const AsideMapped = connect(
	mapStateToProps,
	constDispatchToProps
)(Aside);

export default withSnackbar(AsideMapped);