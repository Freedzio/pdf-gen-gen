import React from 'react';
import { InputController, MyInputProps } from './input.controller';

interface Props extends MyInputProps {
	label: string;
}

export const LabelledInput: React.FC<Props> = (props) => {
	return (
		<div className='d-flex align-items-center justify-content-between'>
			<span>{props.label}</span>
			<InputController {...props} />
		</div>
	);
};
