import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './jss/home-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/timelineData';
import Aside from '../../components/Events/Aside';
import {
	fetchAction,
	toggleLikeAction,
	fetchCommentAction,
	detailAction,
	postCommentAction,
	closeNotifAction,
	searchAction,
} from 'dan-actions/EventActions';
import {
	Timeline,
	Notification,
	SearchEvent,
} from 'dan-components';

class Home extends PureComponent {

	componentDidMount() {
		const { fetchData } = this.props;
		fetchData(data);
	}

	render() {
		const title = brand.name + ' - Home';
		const description = brand.desc;
		const {
			classes,
			dataProps,
			submitLike,
			submitComment,
			fetchComment,
			commentIndex,
			closeNotif,
			messageNotif,
			search,
			showDetail,
			keyword,
			eventIndex
		} = this.props;

		return (
			<div>
				<Helmet>
					<title>{title}</title>
					<meta name="description" content={description} />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="twitter:title" content={title} />
					<meta property="twitter:description" content={description} />
				</Helmet>
				<Hidden only={['lg', 'xl']}>
					<Notification close={() => closeNotif()} message={messageNotif} />
					<Timeline
						dataTimeline={dataProps}
						onlike={submitLike}
						submitComment={submitComment}
						fetchComment={fetchComment}
						commentIndex={commentIndex}
						eventIndex={eventIndex}
						keyword={keyword}
						showDetail={showDetail}
					/>
				</Hidden>
				<Hidden only={['xs', 'sm', 'md']}>
					<Grid container spacing={8} direction="row" justify="flex-start">
						<Grid item md={2} lg={2}></Grid>
						<Grid item md={5} lg={5} sm={12} xs={12}>
							<Paper elevation={0} className={classes.root}>
								<Notification close={() => closeNotif()} message={messageNotif} />
								<SearchEvent search={search}/>
								<Divider className={classes.divider} />
								<Timeline
									dataTimeline={dataProps}
									onlike={submitLike}
									submitComment={submitComment}
									fetchComment={fetchComment}
									commentIndex={commentIndex}
									eventIndex={eventIndex}
									keyword={keyword}
									showDetail={showDetail}
								/>
							</Paper>
						</Grid>
						<Grid item md={3} lg={3} sm={12} xs={12}>
							<Aside currentUserId={1}/>
						</Grid>
						<Grid item md={2} lg={2}></Grid>
					</Grid>
				</Hidden>
			</div>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
	fetchData: PropTypes.func.isRequired,
	submitLike: PropTypes.func.isRequired,
	showDetail: PropTypes.func.isRequired,
	submitComment: PropTypes.func.isRequired,
	keyword: PropTypes.string.isRequired,
	dataProps: PropTypes.object.isRequired,
	fetchComment: PropTypes.func.isRequired,
	commentIndex: PropTypes.number.isRequired,
	eventIndex: PropTypes.number.isRequired,
	closeNotif: PropTypes.func.isRequired,
	messageNotif: PropTypes.string.isRequired,
	search: PropTypes.func.isRequired,
};

const reducer = 'events';
const mapStateToProps = state => ({
	force: state, // force state from reducer
	keyword: state.getIn([reducer, 'keywordValue']),
	dataProps: state.getIn([reducer, 'dataTimeline']),
	commentIndex: state.getIn([reducer, 'commentIndex']),
	eventIndex: state.getIn([reducer, 'eventIndex']),
	messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
	fetchData: bindActionCreators(fetchAction, dispatch),
	search: bindActionCreators(searchAction, dispatch),
	submitComment: bindActionCreators(postCommentAction, dispatch),
	submitLike: bindActionCreators(toggleLikeAction, dispatch),
	showDetail: bindActionCreators(detailAction, dispatch),
	fetchComment: bindActionCreators(fetchCommentAction, dispatch),
	closeNotif: () => dispatch(closeNotifAction),
});

const HomeMapped = connect(
	mapStateToProps,
	constDispatchToProps
)(Home);

export default withStyles(styles)(HomeMapped);
