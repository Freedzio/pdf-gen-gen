import { IInputProps, Input } from 'native-base';
import React from 'react';
import { Controller } from 'react-hook-form';
import { mapFormField } from '../helpers/map-form-field';

export interface MyInputProps {
	control: any;
	name: string;
	isNumber?: boolean;
	isPercent?: boolean;
	inputProps?: IInputProps;
}

export const InputController: React.FC<MyInputProps> = ({
	name,
	control,
	inputProps,
	isNumber,
	isPercent
}) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Input
					{...mapFormField(field as any, isNumber, isPercent)}
					ref={undefined}
					{...inputProps}
				/>
			)}
		/>
	);
};
