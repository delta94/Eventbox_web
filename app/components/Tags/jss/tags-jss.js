import { lighten } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({
	root: theme.mixins.gutters({
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(2),
		border: theme.palette.type === 'dark' ? 'none' : `1px solid ${lighten(theme.palette.primary.dark, 0.9)}`,
		boxShadow: theme.shade.light,
		color: theme.palette.text.primary,
		width: '100%',
		textAlign: 'center',
	}),
	cloud: {
		display: 'inline',
		listStyle: 'none',
		width: 400,
		'& li': {
			listStyle: 'none',
			display: 'inline',
			margin: '2%',
			whiteSpace: 'nowrap',
			color: '#00C853',
			fontWeight: 'bold',
		},
		'& li:nth-of-type(3n + 1)': {
			fontSize: '1.60em',
			color: '#D81B60',
		},
		'& li:nth-of-type(4n + 3)': {
			fontSize: '1.25em',
			color: '#FF9800',
		},
		'& li:nth-of-type(5n - 3)': {
			fontSize: '0.8em',
			color: '#7C4DFF',
		},
		'& li:nth-of-type(6n + 1)': {
			fontSize: '2em',
			color: '#2196F3',
		}
	},
	divider: {
		margin: `${theme.spacing(1.5)}px 0`,
	},
});

export default styles;