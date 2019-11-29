import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { CreateEvent, Tags} from 'dan-components';
import styles from './jss/aside-jss';
import {
	composeAction,
	discardAction,
	postAction,
} from 'dan-actions/EventActions';

class Aside extends React.Component {
	state = {
		privacy: 'public',
		title: '',
		validMail: '',
	};

	handleChange = (event, name) => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleCompose = () => {
		const { compose } = this.props;
		compose();
		this.setState({
			privacy: '  ',
			title: '  ',
		});
	}

	render() {
		const {
			classes,
			openForm,
			discard,
			submitEvent,
		} = this.props;

		const {
			privacy,
			title,
		} = this.state;

		return (
			<div>
				<CreateEvent
					title={title}
					privacy={privacy}
					compose={this.handleCompose}
					submitEvent={submitEvent}
					inputChange={this.handleChange}
					open={openForm}
					closeForm={discard}
				/>
				<Tags 
					title="Interets"
					tagData={['Sport','Education','Social','Language','Party']} 
				/>
				<Footer title="Langues"/>
			</div>
		)
	}
}

Aside.propTypes = {
	classes: PropTypes.object.isRequired,
	discard: PropTypes.func.isRequired,
	submitEvent: PropTypes.func.isRequired,
	openForm: PropTypes.bool.isRequired,
}

const reducer = 'events';
const mapStateToProps = state => ({
	force: state, // force state from reducer
	openForm: state.getIn([reducer, 'openForm']),
	messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
	compose: () => dispatch(composeAction),
	discard: () => dispatch(discardAction),
	submitEvent: bindActionCreators(postAction, dispatch),
	closeNotif: () => dispatch(closeNotifAction),
  });
  
  const AsideMapped = connect(
	mapStateToProps,
	constDispatchToProps
  )(Aside);

export default withStyles(styles)(AsideMapped);