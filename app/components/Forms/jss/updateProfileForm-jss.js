const styles = theme => ({
	item: {},
	field: {
		width: '100%',
		marginTop: 0,
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
		textTransform: 'none'
	},
	preview: {
		display: 'flex',
		marginBottom: 20,
		'& $item': {
			maxWidth: 160,
			marginBottom: 5,
			marginRight: 5
		}
	},
	textEditor: {
		background: theme.palette.background.paper,
		minHeight: 200,
		border: `1px solid ${theme.palette.divider}`,
		padding: '0 10px',
		color: theme.palette.text.primary
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
	}
});

export default styles;