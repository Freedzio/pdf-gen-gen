import { HStack, Text } from 'native-base';
import React from 'react';
import { InputController, MyInputProps } from './input.controller';

interface Props extends MyInputProps {
	label: string;
}

export const LabelledInput: React.FC<Props> = (props) => {
	return (
		<HStack alignItems='center'>
			<Text>{props.label}</Text>
			<InputController {...props} />
		</HStack>
	);
};
