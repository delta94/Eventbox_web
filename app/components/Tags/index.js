import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import UpdateProfileInterestForm from '../Forms/UpdateProfileInterestForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './jss/tags-jss';

class Tags extends React.Component {
  render() {
    const {
      classes,
      tagData,
      title,
      showBtn,
      open,
      closeForm,
      submitProfile,
      inputChange,
      compose
    } = this.props;
    const sex = 'M';
    const name = 'Rivel';
    const branch = '';
    return (
      <Paper className={classes.root}>
        <Typography variant="subtitle1" className={classes.title}>
          {title}
          {' '}
          {showBtn && (
            <IconButton onClick={compose} className={classes.updateBtn} color="primary">
              {' '}
              <Edit />
              {' '}
            </IconButton>
          )}
        </Typography>
        <Divider className={classes.divider} />
        <ul className={classes.cloud}>
          {tagData.map((item, index) => (
            <li key={index.toString()}>{item}</li>
          ))}
        </ul>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Mettre a jour votre profil3"
          extraSize
        >
          <UpdateProfileInterestForm
            name={name}
            sex={sex}
            submitProfile={submitProfile}
            closeForm={closeForm}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </Paper>
    );
  }
}

Tags.propTypes = {
  classes: PropTypes.object.isRequired,
  tagData: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  showBtn: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  compose: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submitProfile: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

Tags.defaultProps = {
  showBtn: false,
};

export default withStyles(styles)(Tags);
