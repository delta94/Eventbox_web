import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import {
  ProfileCard,
  IdentityCard,
  Tags,
  FooterSimple,
} from 'dan-components';

import {
  composeBaseAction,
  discardBaseAction,
  composeAboutAction,
  discardAboutAction,
  composeInterestAction,
  discardInterestAction,
} from 'dan-actions/ProfileActions';
import styles from './jss/profile-jss';

class Profile extends PureComponent {
	state = {
	  name: null,
	  avatar: null,
	  cover: null,
	  sex: null,
	  phone: null,
	  birthday: null,
	  ufr: null,
	}

	handleChange = (event, name) => {
	  this.setState({
	    [name]: event.target.value,
	  });
	};

	handleComposeBase = () => {
	  const { composeBase } = this.props;
	  composeBase();
	}

	handleComposeAbout = () => {
	  const { composeAbout } = this.props;
	  composeAbout();
	}

	handleComposeInterest = () => {
	  const { composeInterest } = this.props;
	  composeInterest();
	}

	submitProfileBase = () => false

	submitProfileAbout = () => false

	submitProfileInterest = () => false

	render() {
	  const title = brand.name + ' - Profile';
	  const description = brand.desc;
	  const {
	    name, avatar, cover, sex, phone, birthday, ufr
	  } = this.state;
	  const {
	    classes,
	    openFormBase,
	    discardBase,
	    openFormAbout,
	    discardAbout,
	    openFormInterest,
	    discardInterest,
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
  <Grid container spacing={3} className={classes.root}>
  <Grid item md={2} lg={2} />
  <Grid item md={8} lg={8}>
  <Paper elevation={0} className={classes.paper}>
  <Grid container spacing={3}>
  <Grid item md={4} lg={4}>
  <ProfileCard
  username="Rivelnet"
  name={name != null ? name : 'Name not defined yet'}
  avatar={avatar != null ? avatar : avatarApi[6]}
  cover={cover != null ? cover : imgApi[43]}
  sex={sex != null ? sex : 'Man or Woman ?'}
  btnText="Metre a jour"
  isVerified
  compose={this.handleComposeBase}
  submitProfile={this.submitProfileBase}
  inputChange={this.handleChange}
  open={openFormBase}
  closeForm={discardBase}
	                />
	              </Grid>
  <Grid item md={8} lg={8}>
  <IdentityCard
  title="A propos de moi"
  email="38013857@parisnanterre.fr"
  phone={phone != null ? phone : 'Phone not defined yet'}
  birthday={birthday != null ? birthday : 'birthday not defined yet'}
  ufr={ufr != null ? ufr : 'UFR not defined yet'}
  compose={this.handleComposeAbout}
  submitProfile={this.submitProfileAbout}
  inputChange={this.handleChange}
  open={openFormAbout}
  closeForm={discardAbout}
	                />
  <Tags
  title="Vos interets"
  showBtn
  tagData={['Sport', 'Education', 'Social', 'Language', 'Party']}
  compose={this.handleComposeInterest}
  submitProfile={this.submitProfileInterest}
  inputChange={this.handleChange}
  open={openFormInterest}
  closeForm={discardInterest}
	                />
  <FooterSimple showBtn />
	              </Grid>
	            </Grid>
	          </Paper>
	        </Grid>
  <Grid item md={2} lg={2} />
	      </Grid>
	    </div>
	  );
	}
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  discardBase: PropTypes.func.isRequired,
  openFormBase: PropTypes.bool.isRequired,
  openFormAbout: PropTypes.bool.isRequired,
  openFormInterest: PropTypes.bool.isRequired,
};

const reducer = 'profile';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  openFormBase: state.getIn([reducer, 'openFormBase']),
  openFormAbout: state.getIn([reducer, 'openFormAbout']),
  openFormInterest: state.getIn([reducer, 'openFormInterest']),
});

const constDispatchToProps = dispatch => ({
  composeBase: () => dispatch(composeBaseAction),
  discardBase: () => dispatch(discardBaseAction),
  composeAbout: () => dispatch(composeAboutAction),
  discardAbout: () => dispatch(discardAboutAction),
  composeInterest: () => dispatch(composeInterestAction),
  discardInterest: () => dispatch(discardInterestAction),
});

const ProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Profile);

export default withStyles(styles)(ProfileMapped);
