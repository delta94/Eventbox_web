import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Ionicon from 'react-ionicons';
import Divider from '@material-ui/core/Divider';
import People from '@material-ui/icons/People';
import styles from './jss/eventDetail-jss';

class EventDetail extends React.Component {

	render() {
		const {
			classes,
			open,
			close,
			detailContent,
			eventIndex
		} = this.props;

		const getImg = (img, bg) => {
			if (img !== '') { return img; }
			return bg;
		}

		return (
			<Dialog
				fullScreen
				open={open}
				onClose={close}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" noWrap color="inherit" className={classes.flex}>
							{detailContent.getIn([eventIndex, 'title'])}
						</Typography>
						<IconButton color="inherit" onClick={() => close()} aria-label="Close">
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className={classes.detailContainer}>
					<Grid container className={classes.root} spacing={24}>
						<Grid item md={5} sm={12} xs={12}>
							<div className="container thumb-nav">
								<img src={getImg(detailContent.getIn([eventIndex, 'image']), detailContent.getIn([eventIndex, 'defaultBg']))} />
							</div>
						</Grid>
						<Grid item md={7} sm={12} xs={12}>
							<section className={classes.detailWrap}>
								<Typography noWrap gutterBottom variant="h5" className={classes.title} component="h2">
									{detailContent.getIn([eventIndex, 'title'])}
								</Typography>
								<Divider className={classes.divider} />
								<Typography noWrap gutterBottom variant="h6" className={classes.subTitle} component="h4">
									<Ionicon icon="ios-calendar-outline" className={classes.textIcon} />
									{detailContent.getIn([eventIndex, 'date'])} &nbsp; a &nbsp; {detailContent.getIn([eventIndex, 'time'])}
								</Typography>
								<Typography component="p" className={classes.desc}>
									{detailContent.getIn([eventIndex, 'content'])}
								</Typography>
								<Typography component="p" className={classes.author}>
									<Ionicon icon="md-contact" className={classes.textIcon} />
									Organise par : &nbsp; {detailContent.getIn([eventIndex, 'name'])}
								</Typography>
								{detailContent.get([eventIndex, 'participant']) !== 0 && (
									<Typography component="p" className={classes.participant}>
										<People className={classes.textIcon} />
										{detailContent.getIn([eventIndex, 'participant'])} personnes y participent
									</Typography>
								)}
								{detailContent.getIn([eventIndex, 'location']) !== '' && (
									<Typography component="p" className={classes.location}>
										<Ionicon icon="ios-pin-outline" className={classes.textIcon} />
										{detailContent.getIn([eventIndex, 'location'])}
									</Typography>
								)}
								<Divider className={classes.divider} />
								<div className={classes.btnArea}>
									<Button
										className={classes.btn}
										variant="contained"
										onClick={() => { false }}
										color="secondary"
									>
										<Ionicon icon="ios-star-outline" />
										&nbsp; Participer
                                    </Button>
									<Button
										className={classes.btn}
										variant="contained"
										onClick={() => { false }}
										color="primary"
									>
										<Ionicon icon="ios-chatbubbles-outline" />
										&nbsp; Contacter l'autheur
                                    </Button>
								</div>
							</section>
						</Grid>
					</Grid>
				</div>
			</Dialog>
		);
	}
}

EventDetail.propTypes = {
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	detailContent: PropTypes.object.isRequired,
	eventIndex: PropTypes.number,
};

EventDetail.defaultProps = {
	eventIndex: undefined
};

export default withStyles(styles)(EventDetail);
