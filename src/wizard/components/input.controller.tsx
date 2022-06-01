import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'reactstrap';
import { mapFormField } from '../helpers/map-form-field';
import { inputStyle } from './column.controller';

export interface MyInputProps {
	control: any;
	name: string;
	isNumber?: boolean;
}

export const InputController: React.FC<MyInputProps> = ({
	name,
	control,
	isNumber
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
