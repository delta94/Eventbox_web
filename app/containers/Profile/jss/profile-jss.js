import { lighten, fade } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	divider: {
		margin: `${theme.spacing(1.5)}px 0`,
		background: 'none'
	},
	paper: {
		padding: theme.spacing(2),
		boxShadow: theme.shade.light,
		color: theme.palette.text.primary,
		border: theme.palette.type === 'dark' ? 'none' : `1px solid ${lighten(theme.palette.primary.dark, 0.9)}`,
		backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.grey[800], 0.75) : fade(theme.palette.background.paper, 0.80),
	},
});

export default styles;
