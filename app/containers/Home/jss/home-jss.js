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
	//============== form ======
	field: {
		width: '100%',
		marginTop: 0,
		'& svg': {
			color: theme.palette.grey[400],
			fontSize: 18,
		}
	},
	formControl: {
		width: '100%',
		marginBottom: '2%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	formSection: {
		marginTop: '3%',
		textAlign: 'center',
	},
	btnArea: {
		textAlign: 'right',
		margin: '5% 0 2% 0',
	},
	btnActions: {
		margin: '2% 0 2% 2%',
	}
});

export default styles;
