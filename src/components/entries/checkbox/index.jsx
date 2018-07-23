import React from 'react';
import {Checkbox} from 'semantic-ui-react';

const CheckboxItm = ( {name, children, text, onChange, value, ...props} ) => {

	return (
		<Checkbox
			toggle
			name={name}
			onChange={onChange}
			value={value}
			{...props}
		>
			{text || children}
		</Checkbox>
	);
};

export default CheckboxItm;
