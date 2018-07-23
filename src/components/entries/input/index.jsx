import React from 'react';
import {Input} from 'semantic-ui-react';

const InputField = ( {name, placeholder, children, text, onChange, value, ...props} ) => {

	return (
		<Input
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			{...props}
		>
			{text || children}
		</Input>
	);
};

export default InputField;
