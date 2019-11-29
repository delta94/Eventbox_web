import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import brand from 'dan-api/dummy/brand';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Ionicon from 'react-ionicons';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Hidden from '@material-ui/core/Hidden';
import logo from 'dan-images/logo.svg';
import { ContentDivider } from '../../components/Divider';
import styles from './jss/auth-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
	return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});


class RegisterSuccess extends React.Component {
  render() {
    const title = brand.name + ' - Register';
    const description = brand.desc;
    const { classes } = this.props;
    const deco = true;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <Fragment>
              <Hidden mdUp>
                <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
                  <img src={logo} alt={brand.name} />
                  {brand.name}
                </NavLink>
              </Hidden>
              <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
                <Hidden smDown>
                  <div className={classes.topBar}>
                    <NavLink to="/" className={classes.brand}>
                      <img src={logo} alt={brand.name} />
                      {brand.name}
                    </NavLink>
                    <Button size="small" className={classes.buttonLink} target="_blank" href="https://ent.parisnanterre.fr/f/u21l1s19/p/mail_upo.u21l1n33/max/render.uP?pCp">
                      <Ionicon className={classes.icon} icon="ios-open-outline" />
											Consulter ma boite etudiante

                    </Button>
                  </div>
                </Hidden>
                <Typography variant="h4" className={classes.title} gutterBottom>
									Register success

                </Typography>
                <Typography className={classes.msg} gutterBottom align="justify">
									Votre inscription a bien ete pris en compte, un mail de confirmation vous a ete envoye
									sur votre boite mail etudiante.

                </Typography>
                <Typography className={classes.msg2} gutterBottom align="justify">
									veillez cliquer sur le lien de confirmation contenu dans le mail pour valider votre compte.

                </Typography>
                <ContentDivider content="Compte deja valide ? connectez-vous" />
                <section className={classes.loginZone}>
                  <Button variant="contained" color="primary" href="/login">
											Connexion
                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </section>
              </Paper>
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

RegisterSuccess.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(withSnackbar(RegisterSuccess));
