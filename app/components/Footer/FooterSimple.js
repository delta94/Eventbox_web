import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import footerLink from 'dan-api/ui/footer';
import styles from './jss/footer-jss';
import PaperSheet from '../Paper/PaperSheet';

class FooterSimple extends React.Component {
	render() {
		const { classes, showBtn } = this.props;
		return (
			<div className={classes.root}>
				<PaperSheet>
					<div className={Type.textCenter}>
						<Button href={footerLink.cgi} className={classNames(classes.footerlink, Type.textGrey)} >
							A propos
                    	</Button>
						<Button href={footerLink.cgi} className={classNames(classes.footerlink, Type.textGrey)} >
							Conditions générales
                    	</Button>
						<Button href={footerLink.confidentialite} className={classNames(classes.footerlink, Type.textGrey)} >
							Confidentialité
                    	</Button>
						<Button href={footerLink.contact} className={classNames(classes.footerlink, Type.textGrey)} >
							Nous contacter
                    	</Button>
						<Button href={footerLink.contact} className={classNames(classes.footerlink, Type.textGrey)} >
							Cookies
                    	</Button>
						<Button href={footerLink.contact} className={classNames(classes.footerlink, Type.textGrey)} >
							Profile
                    	</Button>
						<Button href={footerLink.contact} className={classNames(classes.footerlink, Type.textGrey)} >
							Support
                    	</Button>
						{showBtn && (
							<Button className={classNames(classes.desabledAccount)} >
								Delete account
                    		</Button>
						)}
					</div>
					<div className={classes.copyright}>
						<Typography className={classNames(classes.footerlink, Type.textGrey, Type.textCenter)}>
							&copy; 2019 EeventBox. All Right Reserved
                    	</Typography>
					</div>
				</PaperSheet>
			</div>
		)
	}
}

FooterSimple.propTypes = {
	classes: PropTypes.object.isRequired,
	showBtn: PropTypes.bool,
}

FooterSimple.defaultProps = {
	showBtn: false,
}

export default withStyles(styles)(FooterSimple);