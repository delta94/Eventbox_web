import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Divider from '@material-ui/core/Divider';
import DateRange from '@material-ui/icons/DateRange';
import Chat from '@material-ui/icons/Chat';
import EventAvailable from '@material-ui/icons/EventAvailable';
import FloatingPanel from '../Panel/FloatingPanel';
import UpdateProfileBaseForm from '../Forms/UpdateProfileBaseForm';
import styles from './cardStyle-jss';

class ProfileCard extends React.Component {
	render() {
		const {
			classes,
			cover,
			avatar,
			username,
			name,
			sex,
			isVerified,
			btnText,
			open,
			closeForm,
			submitProfile,
			inputChange,
			compose
		} = this.props;
		const branch = '';
		return (
			<div>
				<Card className={classes.cardSocmed}>
					<CardMedia
						className={classes.mediaProfile}
						image={cover}
					/>
					<CardContent className={classes.contentProfile}>
						<Avatar alt="avatar" src={avatar} className={classes.avatarBig} />
						<Typography variant="h6" className={classes.name} gutterBottom>
							{username} &nbsp;
						{isVerified && <VerifiedUser className={classes.verified} />}
						</Typography>
						<Typography className={classes.subheading} gutterBottom>
							<span className={Type.regular}>{name}</span>
						</Typography>
						<Typography variant="caption" component="p">
							{sex}
						</Typography>
						<Button onClick={compose} className={classes.buttonProfile} size="large" variant="outlined" color="secondary">
							{btnText}
						</Button>
					</CardContent>
					<Divider />
					<CardActions>
						<BottomNavigation
							showLabels
							className={classes.bottomLink}
						>
							<BottomNavigationAction label="Mes events" icon={<DateRange />} />
							<BottomNavigationAction label="Mes messages" icon={<Chat />} />
							<BottomNavigationAction label="Mes invitations" icon={<EventAvailable />} />
						</BottomNavigation>
					</CardActions>
				</Card>
				<FloatingPanel
					openForm={open}
					branch={branch}
					closeForm={closeForm}
					title="Mettre a jour votre profil"
					extraSize
				>
					<UpdateProfileBaseForm
						name={name}
						sex={sex}
						submitProfile={submitProfile}
						closeForm={closeForm}
						inputChange={inputChange}
					/>
				</FloatingPanel>
			</div>
		);
	}
}

ProfileCard.propTypes = {
	classes: PropTypes.object.isRequired,
	cover: PropTypes.string,
	avatar: PropTypes.string,
	username: PropTypes.string.isRequired,
	name: PropTypes.string,
	sex: PropTypes.string,
	btnText: PropTypes.string.isRequired,
	isVerified: PropTypes.bool,
	open: PropTypes.bool.isRequired,
	compose: PropTypes.func.isRequired,
	closeForm: PropTypes.func.isRequired,
	submitProfile: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired,
};

ProfileCard.defaultProps = {
	isVerified: false,
};

export default withStyles(styles)(ProfileCard);
