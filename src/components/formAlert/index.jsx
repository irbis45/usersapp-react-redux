import React from 'react';
import {Message} from 'semantic-ui-react';

const FormMessage = ( {formErrors, formSuccess, successMsg} ) => {

	if( formSuccess ) {
		return (
			<Message
				success
				header={successMsg}
			/>
		);
	}

	const content = [];
	Object.keys(formErrors).map(( fieldName ) => {
		if( formErrors[fieldName].length > 0 ) {
			return content.push(fieldName + formErrors[fieldName]);
		}
	});

	return (
		<Message
			error
			list={content}
		/>
	);
};

export default FormMessage;
