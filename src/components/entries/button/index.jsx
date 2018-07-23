import React from 'react';
import { Button } from 'semantic-ui-react';

const MyButton = ( {name, type='button', children, text, onClick, disabled, ...props} ) => {

	return (
		<Button
			type={type}
			name={name}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{text || children}
		</Button>
	);
};

export default MyButton;
