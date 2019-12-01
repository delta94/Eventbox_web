import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Ionicon from 'react-ionicons';
import ActionDelete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import css from 'dan-styles/Form.scss';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import isImage from './helpers/helpers.js';
import styles from './jss/updateProfileForm-jss';

class UpdateProfileBaseForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			openSnackBar: false,
			errorMessage: '',
			files: [],
		};
		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(filesVal) {
		const { files } = this.state;
		let oldFiles = files;
		const filesLimit = 1;
		oldFiles = oldFiles.concat(filesVal);
		if (oldFiles.length > filesLimit) {
			console.log('Cannot upload more than ' + filesLimit + ' items.');
		} else {
			this.setState({ files: oldFiles });
		}
	}

	onDropRejected() {
		this.setState({
			openSnackBar: true,
			errorMessage: 'File too big or not an image, max size is 3MB',
		});
	}

	handleRequestCloseSnackBar = () => {
		this.setState({
			openSnackBar: false,
		});
	};

	handleUpdate = (name, sex, files) => {
		const { submitProfile } = this.props;
		submitProfile(name, sex, files);
		this.setState({ eventContent: '', files: [] });
	};

	handleRemove(file, fileIndex) {
		const { files } = this.state;
		const thisFiles = files;
		// This is to prevent memory leaks.
		window.URL.revokeObjectURL(file.preview);

		thisFiles.splice(fileIndex, 1);
		this.setState({ files: thisFiles });
	}

	render() {
		const { classes, closeForm, name, sex, inputChange, } = this.props;
		const { files, openSnackBar, errorMessage, } = this.state;

		let dropzoneRef;

		const fileSizeLimit = 3000000;

		const deleteBtn = (file, index) => (
			<div className="middle">
				<IconButton onClick={() => this.handleRemove(file, index)}>
					<ActionDelete className="removeBtn" />
				</IconButton>
			</div>
		);

		const previews = filesArray => filesArray.map((file, index) => {
			if (isImage(file)) {
				const base64Img = URL.createObjectURL(file) || '/pic' + file.path;
				return (
					<div key={index.toString()} className={classes.item}>
						<div className="imageContainer col fileIconImg">
							<figure className="imgWrap"><img className="smallPreviewImg" src={base64Img} alt="preview" /></figure>
							{deleteBtn(file, index)}
						</div>
						<Typography noWrap variant="caption">{file.name}</Typography>
					</div>
				);
			}
			return false;
		});
		
		return (
			<div>
				<form>
					<section className={css.bodyForm}>
						<div>
							<TextField
								id="name"
								label="Votre nom"
								className={classes.field}
								placeholder="Votre nom"
								value={name}
								onChange={(event) => inputChange(event, 'title')}
								margin="normal"
							/>
						</div>
						<div>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="sex">Votre sexe</InputLabel>
								<Select
									native
									value={sex}
									onChange={(event) => inputChange(event, 'sex')}
									inputProps={{ id: 'sex' }}
								>
									<option value="" />
									<option value={1}>Homme</option>
									<option value={2}>Femme</option>
								</Select>
							</FormControl>
						</div>
						<Grid container alignItems="center">
							<Dropzone
								className={classes.hiddenDropzone}
								acceptClassName="stripes"
								onDrop={this.onDrop}
								maxSize={fileSizeLimit}
								ref={(node) => { dropzoneRef = node; }}
							>
								{({ getRootProps, getInputProps }) => (
									<div {...getRootProps()}>
										<input {...getInputProps()} />
									</div>
								)}
							</Dropzone>
							<Button
								className={classes.buttonUpload}
								color="secondary"
								component="button"
								onClick={() => {
									dropzoneRef.open();
								}}
							>
								<Ionicon icon="md-image" /> &nbsp; Votre avatar
              				</Button>
							<Typography variant="caption">(Max 3MB)</Typography>
						</Grid>
						<div className={classes.preview}>
							{previews(files)}
						</div>
					</section>
					<div className={css.buttonArea}>
						<Button type="button" onClick={() => closeForm()}>
							Discard
            			</Button>
						<Button
							variant="contained"
							color="secondary"
							type="button"
							disabled={!sex || !name}
							onClick={() => this.handleUpdate(name, sex, files)}
						>
							Send&nbsp; <Send className={classes.sendIcon} />
						</Button>
					</div>
				</form>
				<Snackbar
					open={openSnackBar}
					message={errorMessage}
					autoHideDuration={4000}
					onClose={this.handleRequestCloseSnackBar}
				/>
			</div>
		);
	}
}

UpdateProfileBaseForm.propTypes = {
	classes: PropTypes.object.isRequired,
	sex: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	submitProfile: PropTypes.func.isRequired,
	closeForm: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(UpdateProfileBaseForm);
