import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Close from '@material-ui/icons/Close';
import CommentIcon from '@material-ui/icons/Comment';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Ionicon from 'react-ionicons';
import Comment from './Comment';
import EventDetail from './EventDetail';
import styles from './jss/timeline-jss';

class Timeline extends React.Component {
	state = {
		openComment: false,
		openDetail: false,
	};

	handleOpenComment = (data) => {
		const { fetchComment } = this.props;
		fetchComment(data);
		this.setState({ openComment: true });
	};

	handleCloseComment = () => {
		this.setState({ openComment: false });
	};

	handleOpenDetail = (event) => {
		const { showDetail } = this.props;
		this.setState({ openDetail: true });
		showDetail(event);
	};

	handleCloseDetail = () => {
		this.setState({ openDetail: false });
	};

	render() {
		const {
			classes,
			dataTimeline,
			eventIndex,
			onlike,
			commentIndex,
			keyword,
			submitComment,
		} = this.props;
		const { openComment, openDetail } = this.state;
		const subTexte = (text, length) => {
			if (text == null) { return ""; }
			if (text.length <= length) { return text; }
			text = text.substring(0, length);
			let last = text.lastIndexOf(" ");
			text = text.substring(0, last);
			return text + "...";
		}
		const getItem = dataArray => dataArray.map(data => {

			const renderHTML = { __html: subTexte(data.get('content'), 180) };
			if (data.get('title').toLowerCase().indexOf(keyword) === -1) {
				return false;
			}
			return (
				<li key={data.get('id')}>
					<div className={classes.iconBullet}>
						<Tooltip id={'tooltip-icon-' + data.get('id')} title={data.get('time')}>
							<Icon className={classes.icon}>
								<Ionicon icon="ios-calendar" />
							</Icon>
						</Tooltip>
					</div>
					<Card className={classes.cardSocmed}>
						<CardHeader
							avatar={
								<Avatar alt="avatar" src={data.get('avatar')} className={classes.avatar} />
							}
							action={(
								data.get('privacy') == '2' ? <Ionicon icon="ios-lock-outline" /> : <Ionicon icon="md-globe" />
							)}
							title={subTexte(data.get('title'), 80)}
							subheader={'organise par ' + data.get('name')}
						/>
						{data.get('image') !== '' && (
							<CardActionArea onClick={() => this.handleOpenDetail(data)}>
								<CardMedia
									className={classes.media}
									image={data.get('image')}
									title={data.get('name')}
								/>
							</CardActionArea>
						)}
						<CardContent>
							<Typography component="p" className={classes.eventDate}>
								<Ionicon icon="ios-calendar-outline" /> {data.get('date')} &nbsp; a &nbsp; {data.get('time')}
							</Typography>
							<Typography component="p" className={classes.eventLocation}>
								<Ionicon icon="ios-pin-outline" /> Nanterre, bat C
							</Typography>
						</CardContent>
						<CardActions className={classes.actions}>
							<Typography variant="caption" component="span">
								<Ionicon icon="ios-people" /> 3 personnes
							</Typography>
							<IconButton className={classes.btnAction}>
								<Ionicon icon="md-close" />
								<Typography variant="caption" component="span">
									Pas interesse(e)
								</Typography>
							</IconButton>
							<IconButton className={classes.btnAction}>
								<Ionicon icon="ios-share-alt" />
								<Typography variant="caption" component="span">
									Partager
								</Typography>
							</IconButton>
							<div className={classes.rightIcon}>
								<Typography variant="caption" component="span">
									{data.get('comments') !== undefined ? data.get('comments').size : 0}
								</Typography>
								<IconButton aria-label="Comment" onClick={() => this.handleOpenComment(data)}>
									<CommentIcon />
								</IconButton>
							</div>
						</CardActions>
					</Card>
				</li>
			);
		});
		return (
			<Fragment>
				<Comment
					open={openComment}
					handleClose={this.handleCloseComment}
					submitComment={submitComment}
					dataComment={dataTimeline.getIn([commentIndex, 'comments'])}
				/>
				<EventDetail
					open={openDetail}
					close={this.handleCloseDetail}
					detailContent={dataTimeline}
					eventIndex={eventIndex}
				/>
				<ul className={classes.timeline}>
					{getItem(dataTimeline)}
				</ul>
			</Fragment>
		);
	}
}

Timeline.propTypes = {
	classes: PropTypes.object.isRequired,
	onlike: PropTypes.func,
	dataTimeline: PropTypes.object.isRequired,
	fetchComment: PropTypes.func,
	submitComment: PropTypes.func,
	commentIndex: PropTypes.number,
	eventIndex: PropTypes.number.isRequired,
	showDetail: PropTypes.func.isRequired,
	keyword: PropTypes.string.isRequired,
};

Timeline.defaultProps = {
	onlike: () => (false),
	fetchComment: () => { },
	submitComment: () => { },
	commentIndex: 0,
};

export default withStyles(styles)(Timeline);
