import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import styles from './cardStyle-jss';

class ProductCard extends React.Component {
	render() {
		const {
			classes,
			thumbnail,
			name,
			desc,
			detailOpen,
			width,
		} = this.props;
		return (
			<Card className={classNames(classes.cardProduct, isWidthUp('sm', width))}>
				<CardMedia
					className={classes.mediaProduct}
					image={thumbnail}
					title={name}
				/>
				<CardContent className={classes.floatingButtonWrap}>
					<Tooltip title="Show detail" placement="top">
						<Fab onClick={detailOpen} size="small" color="secondary" aria-label="show detail" className={classes.buttonAdd}>
							<KeyboardArrowDown />
						</Fab>
					</Tooltip>
					<Typography noWrap gutterBottom variant="h5" className={classes.title} component="h2">
						{name}
					</Typography>
					<Typography component="p" className={classes.desc}>
						{desc}
					</Typography>
				</CardContent>
				<CardActions className={classes.price}>
					<div className={classes.rightAction}>
						<Button size="small" variant="outlined" color="secondary">
							Join event
            			</Button>
					</div>
				</CardActions>
			</Card>
		);
	}
}

ProductCard.propTypes = {
	classes: PropTypes.object.isRequired,
	width: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	detailOpen: PropTypes.func,
};

ProductCard.defaultProps = {
	detailOpen: () => (false),
};

const ProductCardResponsive = withWidth()(ProductCard);
export default withStyles(styles)(ProductCardResponsive);
