import React, {PureComponent} from 'react';
import {Modal, Form} from 'semantic-ui-react';
import classNames from 'classnames';
import FormAlert from '../formAlert';
import Input from '../entries/input';
import Select from '../entries/select';
import Button from '../entries/button';
import api from '../../api';

class ModalForm extends PureComponent {

	constructor( props ) {
		super(props);
		this.state = {
			size          : this.props.size || 'mini',
			header        : this.props.header || 'User info',
			btnText       : this.props.btnText || 'Добавить',
			form          : {
				firstName: '',
				lastName : '',
				group    : ''
			},
			valid         : {
				formErrors    : {
					firstName: '',
					lastName : ''
				},
				firstNameValid: false,
				lastNameValid : false,
				formValid     : false
			},
			serverResponse: {
				send     : false,
				status   : null,
				statusMsg: ''
			}
		};
	}

	componentWillMount() {
		api.listGroups()
			.then(( {data} ) => {
				this.props.getGroups(data);
			})
			.catch(err => console.log(err));
	}

	sendData = () => {
		api.addUser({
			firstName: this.state.form.firstName,
			lastName : this.state.form.lastName,
			group    : this.state.form.group,
		})
			.then(( {data} ) => {
				this.props.addNewUser({
					id        : data.user.id,
					firstName : data.user.firstName,
					lastName  : data.user.lastName,
					group     : data.user.group || 0,
					groupTitle: data.user.groupTitle || ''
				});
				this.formSendStateUpd(data.msg, true);
			})
			.catch(err => {
				this.formSendStateUpd({error: `: ${err.response.statusText}`}, false);
			});
	};

	formSendStateUpd = ( msg, status ) => {
		this.setState({
				serverResponse: {
					...this.state.serverResponse,
					send     : true,
					status   : status,
					statusMsg: msg
				}
			},
			() => {
				setTimeout(() => {
					this.setState({
						serverResponse: {
							...this.state.serverResponse,
							send     : false,
							status   : null,
							statusMsg: ''
						}
					});
				}, 5000);
			});
	};

	resetForm = () => {
		this.setState({
			form    : {
				firstName: '',
				lastName : '',
				group    : ''
			},
			valid   : {
				formErrors    : {
					firstName: '',
					lastName : ''
				},
				firstNameValid: false,
				lastNameValid : false,
				formValid     : false
			},
			formSend: false
		});
	};

	onFieldChange = ( {target} ) => {
		this.setState({form: {...this.state.form, [target.name]: target.value}});
	};

	onSelectChange = ( i, event ) => {
		this.setState({form: {...this.state.form, [event.name]: event.value}});
	};

	handleClose = () => {
		this.resetForm();
	};

	onSendForm = () => {
		this.validateField();
	};

	validateField() {
		let {firstNameValid, lastNameValid, formErrors: fieldValidationErrors} = this.state.valid;

		Object.keys(this.state.form).map(( key ) => {
			switch ( key ) {
				case 'firstName':
					firstNameValid                  = this.state.form[key].length >= 6;
					fieldValidationErrors.firstName = firstNameValid ? '' : ' is invalid';
					break;
				case 'lastName':
					lastNameValid                  = this.state.form[key].length >= 6;
					fieldValidationErrors.lastName = lastNameValid ? '' : ' is too short';
					break;
				default:
					break;
			}
		});

		this.setState({
			valid: {
				...this.state.valid,
				formErrors: fieldValidationErrors,
				firstNameValid,
				lastNameValid
			}
		}, this.validateForm);
	}

	validateForm() {
		this.setState({
			valid: {
				...this.state.valid,
				formValid: this.state.valid.firstNameValid && this.state.valid.lastNameValid
			}
		}, () => {
			if( this.state.valid.formValid ) {
				this.sendData();
			}
		});
	}

	render() {
		const {groups, isLoaded} = this.props;

		let groupsItem = [
			{key: 'no_groups', text: 'Без группы', value: '-'},
		];

		isLoaded && groups.map(group => (
			groupsItem.push({
				key  : group._id,
				text : group.title,
				value: group._id,
			})
		));

		const classesForm = classNames({
			error  : this.state.valid.formErrors.firstName || this.state.valid.formErrors.lastName || this.state.serverResponse.status === false,
			success: this.state.serverResponse.send && this.state.serverResponse.status === true
		});

		return (
			<Modal size={this.state.size} trigger={this.props.trigger} onClose={this.handleClose}>
				<Modal.Header>{this.state.header}</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Form className={classesForm}>
							<Form.Field>
								<FormAlert
									formErrors={this.state.serverResponse.statusMsg || this.state.valid.formErrors}
									formSuccess={this.state.serverResponse.send && this.state.serverResponse.status === true}
									successMsg={this.state.serverResponse.statusMsg}
								/>
							</Form.Field>
							<Form.Field>
								<Input
									name='firstName'
									placeholder='First name'
									onChange={this.onFieldChange}
								/>
							</Form.Field>
							<Form.Field>
								<Input
									name='lastName'
									placeholder='Last name'
									onChange={this.onFieldChange}
								/>
							</Form.Field>
							<Form.Field>
								<Select
									options={groupsItem}
									defaultValue=''
									name='group'
									placeholder='Group'
									onChange={this.onSelectChange}
								/>
							</Form.Field>
						</Form>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						primary
						onClick={this.onSendForm}
					>
						{this.state.btnText}
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default ModalForm;
