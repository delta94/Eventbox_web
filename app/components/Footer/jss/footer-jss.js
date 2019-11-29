const styles = theme => ({
	root: {
		marginTop: theme.spacing(3),
	},
	footerlink: {
		fontSize: theme.typography.pxToRem(10),
		flexBasis: '33.33%',
		flexShrink: 0,
		textTransform: 'none'
	},
	languageBtn: {
		fontSize: theme.typography.pxToRem(12),
		flexBasis: '33.35%',
		flexShrink: 0,
		textTransform: 'none'
	},
	copyright: {
		marginTop: theme.spacing(3),
	},
	divider: {
		margin: `${theme.spacing(1.5)}px 0`,
	},
	desabledAccount: {
		fontSize: theme.typography.pxToRem(10),
		flexBasis: '33.33%',
		flexShrink: 0,
		textTransform: 'none',
		color: 'red',
		border: '1px solid red',
	},
});

export default styles;