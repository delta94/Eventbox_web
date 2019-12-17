const styles = theme => ({
	item: {},
	field: {
		width: '100%',
		marginTop: 0,
		marginBottom: 0,
		'& svg': {
			color: theme.palette.grey[400],
			fontSize: 18,
		}
	},
	hiddenDropzone: {
		display: 'none'
	},
	buttonUpload: {
		marginRight: theme.spacing(),
		textTransform: 'none',
	},
	preview: {
		display: 'flex',
		marginBottom: 20,
		'& $item': {
			maxWidth: 360,
			marginBottom: 5,
			marginRight: 5
		}
	},
	dateLabel: {
		marginBottom: '3%',
	},
	divider: {
		marginBottom: '4%',
	},
	textEditor: {
		background: theme.palette.background.paper,
		minHeight: 80,
		border: `1px solid ${theme.palette.divider}`,
		padding: '0 10px',
		color: theme.palette.text.primary,
	},
	toolbarEditor: {
		background: theme.palette.background.default,
		border: 'none',
		'& > div': {
			background: theme.palette.background.paper,
			'& img': {
				filter: theme.palette.type === 'dark' ? 'invert(100%)' : 'invert(0%)'
			},
			'& a': {
				color: theme.palette.text.primary,
				'& > div': {
					borderTopColor: theme.palette.text.primary,
				}
			}
		}
	},
	sendIcon: {
		marginLeft: 10
	},
	formControl: {
		width: '100%',
		marginBottom: '2%',
	},
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
	},
	btnArea: {
		textAlign: 'right',
		marginRight: '3%',
	},
	formRoot: {
		padding: '0 2% 0 2%',
	}
});

export default styles;