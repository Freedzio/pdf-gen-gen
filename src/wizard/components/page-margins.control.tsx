import { HStack, IInputProps } from 'native-base';
import React from 'react';
import { InputController } from './input.controller';
import { LabelledInput } from './labelled-input.component';

type Props = {
	control: any;
};

export const PageMarginsControl: React.FC<Props> = ({ control }) => {
	const inputProps: IInputProps = { marginX: 3, width: 60 };
	return (
		<>
			Page margins
			<HStack alignItems='center'>
				<LabelledInput
					label='Left:'
					control={control}
					name='pageMargins.0'
					inputProps={inputProps}
				/>
				<LabelledInput
					label='Top:'
					control={control}
					name='pageMargins.1'
					inputProps={inputProps}
				/>
				<LabelledInput
					label='Right:'
					control={control}
					name='pageMargins.2'
					inputProps={inputProps}
				/>
				<LabelledInput
					label='Bottom:'
					control={control}
					name='pageMargins.3'
					inputProps={inputProps}
				/>
			</HStack>
		</>
	);
};
