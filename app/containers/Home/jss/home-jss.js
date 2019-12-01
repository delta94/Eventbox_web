import { lighten, fade } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({
	root: {
		paddingTop: theme.spacing(2),
		paddingRight: theme.spacing(2),
		boxShadow: theme.shade.light,
		color: theme.palette.text.primary,
		border: theme.palette.type === 'dark' ? 'none' : `1px solid ${lighten(theme.palette.primary.dark, 0.9)}`,
		backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.grey[800], 0.75) : fade(theme.palette.background.paper, 0.85),
	},
	divider: {
		marginTop: `${theme.spacing(2)}px`,
		marginBottom: `${theme.spacing(2)}px`,
	},
	// ===== steppers ========
	rootStepper: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	btnActions: {
		marginTop: '2%',
	},
	paper: {
		
	},
});

export default styles;
