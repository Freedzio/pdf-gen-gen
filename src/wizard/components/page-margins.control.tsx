import { HStack, IInputProps, Input } from 'native-base';
import React from 'react';
import { Controller } from 'react-hook-form';
import { mapFormField } from '../helpers/map-form-field';
import { InputController } from './input.controller';

type Props = {
	control: any;
};

export const PageMarginsControl: React.FC<Props> = ({ control }) => {
	const inputProps: IInputProps = { marginX: 3, width: 60 };
	return (
		<>
			Page margins
			<HStack alignItems='center'>
				Left:
				<InputController
					control={control}
					name='pageMargins.0'
					inputProps={inputProps}
				/>
				Top:
				<InputController
					control={control}
					name='pageMargins.1'
					inputProps={inputProps}
				/>
				Right:
				<InputController
					control={control}
					name='pageMargins.2'
					inputProps={inputProps}
				/>
				Bottom:
				<InputController
					control={control}
					name='pageMargins.3'
					inputProps={inputProps}
				/>
			</HStack>
		</>
	);
};
