const styles = theme => ({
	flex: {
		flex: 1,
	},
	wrapper: {
		fontFamily: theme.typography.fontFamily,
		position: 'relative',
		color: theme.palette.text.secondary,
		borderRadius: theme.rounded.big,
		boxShadow: theme.shadows[2],
		background: theme.palette.background.paper,
		border: `1px solid ${theme.palette.primary.main}`,
		width: '93%',
		marginLeft: '65px',
	},
	search: {
		width: theme.spacing(9),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		font: 'inherit',
		padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(9)}px`,
		border: 0,
		display: 'block',
		verticalAlign: 'middle',
		whiteSpace: 'normal',
		background: 'none',
		margin: 0, // Reset for Safari
		color: 'inherit',
		width: '100%',
		'&:focus': {
			outline: 0,
		},
	},
});

export default styles;
