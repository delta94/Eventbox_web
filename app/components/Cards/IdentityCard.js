import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Ionicon from 'react-ionicons';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import LocalPhone from '@material-ui/icons/LocalPhone';
import School from '@material-ui/icons/School';
import Edit from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import UpdateProfileAboutForm from '../Forms/UpdateProfileAboutForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './cardStyle-jss';

class IdentityCard extends React.Component {
  render() {
    const {
      classes,
      title,
      email,
      phone,
      birthday,
      ufr,
      open,
      closeForm,
      submitProfile,
      inputChange,
      compose
    } = this.props;
    const branch = '';
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="subtitle1" className={classes.title}>{title}</Typography>
            <IconButton className={classes.updateBtn} color="primary" onClick={compose}>
              {' '}
              <Edit />
              {' '}
            </IconButton>
            <Divider className={classes.divider} />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Ionicon icon="md-mail" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <LocalPhone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Phone" secondary={phone} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <CardGiftcard />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Birthday" secondary={birthday} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <School />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="UFR" secondary={ufr} />
            </ListItem>
          </CardContent>
        </Card>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Mettre a jour votre profil2"
          extraSize
        >
          <UpdateProfileAboutForm
            name={phone}
            sex={ufr}
            submitProfile={submitProfile}
            closeForm={closeForm}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </div>
    );
  }
}

IdentityCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  ufr: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  compose: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submitProfile: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(IdentityCard);
