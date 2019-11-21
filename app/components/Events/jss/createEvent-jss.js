const styles = theme => ({
	addBtn: {
		position: 'fixed',
		bottom: 30,
		right: 30,
		zIndex: 1000
	},
	createBtn: {
		borderRadius: 0,
		padding: '4%',
		boxShadow: theme.shadows[7],
		border: `2px solid ${theme.palette.common.white}`,
		background: 'linear-gradient(45deg, #00BFA5 30%, #689F38 90%)',
	}
});

export default styles;