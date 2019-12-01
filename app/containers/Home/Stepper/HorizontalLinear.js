import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Type from 'dan-styles/Typography.scss';
import styles from '../jss/home-jss';
import {
	UpdateAbout,
	UpdateInterest,
} from 'dan-components';

function getSteps() {
	return ['A propos de moi', "Mes centre d'interets", 'Events cool'];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return <UpdateAbout />;
		case 1:
			return <UpdateInterest />;
		case 2:
			return 'This is the bit I really care about!';
		default:
			return 'Unknown step';
	}
}

class HorizontalLinear extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	};

	state = {
		activeStep: 1,
		skipped: new Set(),
	};

	handleNext = () => {
		const { activeStep } = this.state;
		let { skipped } = this.state;
		if (this.isStepSkipped(activeStep)) {
			skipped = new Set(skipped.values());
			skipped.delete(activeStep);
		}
		this.setState({
			activeStep: activeStep + 1,
			skipped,
		});
	};

	handleBack = () => {
		const { activeStep } = this.state;
		this.setState({
			activeStep: activeStep - 1,
		});
	};

	handleSkip = () => {
		const { activeStep, skipped } = this.state;
		if (!this.isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}
		const skippedConst = new Set(skipped.values());
		skipped.add(activeStep);
		this.setState({
			activeStep: activeStep + 1,
			skipped: skippedConst,
		});
	};

	handleReset = () => {
		this.setState({
			activeStep: 0,
		});
	};

	isStepOptional = step => (false);

	isStepSkipped(step) {
		const { skipped } = this.state;
		return skipped.has(step);
	}

	render() {
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep} = this.state;

		return (
			<div className={classes.rootStepper}>
				<Stepper activeStep={activeStep} alternativeLabel={true}>
					{steps.map((label, index) => {
						const props = {};
						const labelProps = {};
						if (this.isStepOptional(index)) {
							labelProps.optional = <Typography className={Type.textCenter} variant="caption">Optional</Typography>;
						}
						if (this.isStepSkipped(index)) {
							props.completed = false;
						}
						return (
							<Step key={label} {...props}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<Divider className={classes.divider}/>
				<div>
					{activeStep === steps.length ? (
						<div>
							<Typography className={classes.instructions}>
								All steps completed - you&quot;re finished
              				</Typography>
							<Button onClick={this.handleReset} className={classes.button}>
								Reset
              				</Button>
						</div>
					) : (
							<div>
								<div className={classes.instructions}>{getStepContent(activeStep)}</div>
								<Divider className={classes.divider}/>
								<div className={classes.btnActions}>
									<Button
										disabled={activeStep === 0}
										onClick={this.handleBack}
										className={classes.button}
									>
										Back
                					</Button>
									{this.isStepOptional(activeStep) && (
										<Button
											variant="contained"
											color="primary"
											onClick={this.handleSkip}
											className={classes.button}
										>
											Skip
                  					</Button>
									)}
									<Button
										variant="contained"
										color="primary"
										onClick={this.handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</div>
							</div>
						)}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(HorizontalLinear);