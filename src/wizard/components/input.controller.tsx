import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'reactstrap';
import { mapFormField } from '../helpers/map-form-field';

export interface MyInputProps {
	control: any;
	name: string;
	isNumber?: boolean;
	isPercent?: boolean;
	inputStyle?: any;
}

export const InputController: React.FC<MyInputProps> = ({
	name,
	control,
	inputStyle,
	isNumber,
	isPercent
}) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Input
					style={inputStyle}
					{...mapFormField(field as any, isNumber)}
					ref={undefined}
				/>
			)}
		/>
	);
};
