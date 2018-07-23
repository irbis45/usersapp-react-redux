import React from 'react';
import {Select} from 'semantic-ui-react';

const SelectField = ( {name, placeholder, options, children, text, onChange, value, ...props} ) => {

	return (
		<Select
			name={name}
			options={options}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			{...props}
		>
			{text || children}
		</Select>
	);
};

export default SelectField;
