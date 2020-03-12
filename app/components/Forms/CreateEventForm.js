import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
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
import styles from './jss/createEventForm-jss';
import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import defaultImg from '../../../public/images/events/kpi.jpg';
import FloatingPanel from '../Panel/FloatingPanel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	'SPORT',
	'PARTY',
	'EDUCATION',
	'TRAVEL',
	'SOCIAL',
	'MUSIC',
	'DEBAT',
];

const content = {
	blocks: [{
		key: '637gr',
		text: 'Decrivez votre super event ici 😀',
		type: 'unstyled',
		depth: 0,
		inlineStyleRanges: [],
		entityRanges: [],
		data: {}
	}],
	entityMap: {}
};

class CreateEventForm extends React.Component {

	constructor(props) {
		super(props);
		const contentBlock = convertFromRaw(content);
		if (contentBlock) {
			const editorState = EditorState.createWithContent(contentBlock);
			this.state = {
				openSnackBar: false,
				errorMessage: '',
				location: { value: "" },
				eventTitle: { value: "" },
				startTime: { value: null },
				endTime: { value: null },
				category: { value: [] },
				files: [],
				editorState,
				eventContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
			};
		}
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

	onEditorStateChange = editorState => {
		this.setState({
			editorState,
			eventContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
		});
	};

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

	//==================================

	handleInputChange = (event) => {
		const { target } = event;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName]: {
				value: inputValue,
			}
		});
	}

	handleDateChange = (date, name) => {
		this.setState({
			[name]: { value: date },
		});
	};

	// =============== send data to server ============
	handleCreate = (event) => {
		event.preventDefault();

		const file = this.state.files[0];
		const title = this.state.eventTitle.value;
		const description = this.state.eventContent;
		const endTime = this.state.endTime.value;
		const startTime = this.state.startTime.value;
		const category = this.state.category.value;
		const location = this.state.location.value;
		
		const { submitEvent } = this.props;
		submitEvent(file, title, description, location, category, startTime, endTime);

		this.setState({
			eventContent: '',
			eventTitle: { value: '' },
			category: { value: [] },
			location: { value: '' },
			startTime: { value: null },
			endTime: { value: null },
			files: [],
		});
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
		console.log('file : ' + defaultImg);
		const branch = '';
		const {
			classes,
			open,
			closeForm,
			compose,
		} = this.props;
		const {
			editorState,
			eventTitle,
			location,
			startTime,
			endTime,
			category,
			files,
			openSnackBar,
			errorMessage,
		} = this.state;
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
				<Button variant="contained" onClick={compose} color="secondary" fullWidth className={classes.createBtn}>
					<Add /> &nbsp;Creer un nouveau event
          		</Button>
				<Tooltip title="Create new event">
					<Fab color="secondary" onClick={() => compose()} className={classes.addBtn}>
						<Add />
					</Fab>
				</Tooltip>
				<FloatingPanel
					openForm={open}
					branch={branch}
					closeForm={closeForm}
					title="Create new event"
					extraSize
				>
					<div className={classes.formRoot}>
						<form onSubmit={(event) => this.handleCreate(event)}>
							<section className={css.bodyForm}>
								<div>
									<TextField
										id="eventTitle"
										name="eventTitle"
										label="Le titre de votre events"
										className={classes.field}
										placeholder="Le titre de votre events"
										value={eventTitle.value}
										onChange={(event) => this.handleInputChange(event)}
										margin="normal"
										required
									/>
								</div>
								<div>
									<FormControl className={classes.formControl}>
										<InputLabel id="category">Category</InputLabel>
										<Select
											labelId="category"
											id="category"
											name="category"
											multiple
											value={category.value}
											onChange={(event) => this.handleInputChange(event)}
											input={<Input />}
											renderValue={selected => selected.join(', ')}
											MenuProps={MenuProps}
										>
											{names.map(name => (
												<MenuItem key={name} value={name}>
													<Checkbox checked={category.value.indexOf(name) > -1} />
													<ListItemText primary={name} />
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
								<div>
									<TextField
										id="location"
										name="location"
										label="Adresse de l'event"
										className={classes.field}
										placeholder="Adresse de l'event"
										value={location.value}
										onChange={(event) => this.handleInputChange(event)}
										margin="none"
										required
									/>
								</div>
								<div>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<Grid container spacing={2} justify="center" >
											<Grid item sm={6} md={6} lg={6}>
												<DateTimePicker
													name="startTime"
													format="yyyy/MM/dd HH:mm"
													margin="none"
													id="startTime"
													value={startTime.value}
													disablePast
													onChange={(date) => this.handleDateChange(date, "startTime")}
													label="Date de debut de l'event"
													variant="inline"
													autoOk={true}
													className={classes.field}
												/>
											</Grid>
											<Grid item sm={6} md={6} lg={6}>
												<DateTimePicker
													name="endTime"
													format="yyyy/MM/dd HH:mm"
													margin="none"
													id="endTime"
													value={endTime.value}
													disablePast
													onChange={(date) => this.handleDateChange(date, "endTime")}
													label="Date de fin de l'event"
													variant="inline"
													autoOk={true}
													className={classes.field}
												/>
											</Grid>
										</Grid>
									</MuiPickersUtilsProvider>
								</div> <br />
								<div>
									<Editor
										editorState={editorState}
										editorClassName={classes.textEditor}
										toolbarClassName={classes.toolbarEditor}
										onEditorStateChange={this.onEditorStateChange}
										toolbar={{
											options: ['inline', 'colorPicker', 'emoji', 'list', 'link'],
											inline: { inDropdown: true },
											color: true,
											list: { inDropdown: true },
											textAlign: { inDropdown: true },
											link: { inDropdown: true },
										}}
									/>
								</div>
								<br />
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
										<Ionicon icon="md-image" /> &nbsp; Cliquez ou deposez l'image ici
              									</Button>
									<Typography variant="caption">(Max 3MB)</Typography>
								</Grid>
								<div className={classes.preview}>
									{previews(files)}
								</div>
							</section>
							<div className={classes.btnArea}>
								<Button
									variant="contained"
									color="secondary"
									type="submit"
								>
									Update &nbsp; <Send className={classes.sendIcon} />
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
				</FloatingPanel>
			</div>
		);
	}
}

CreateEventForm.propTypes = {
	classes: PropTypes.object.isRequired,
	submitEvent: PropTypes.func.isRequired,
	closeForm: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	compose: PropTypes.func.isRequired,
};

export default withStyles(styles)(CreateEventForm);
