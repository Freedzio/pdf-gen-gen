import { VStack, Text, HStack } from 'native-base';
import React from 'react';
import { Section } from '../types/wizard.values';
import { LabelledInput } from './labelled-input.component';

type Props = {
	rowIndex: number;
	columnIndex: number;
	control: any;
	section: Section;
};

export const CellController: React.FC<Props> = ({
	rowIndex,
	columnIndex,
	control,
	section
}) => {
	const inputProps = {
		marginX: 2
	};
	return (
		<VStack alignItems='flex-end'>
			<Text alignSelf='flex-start'>Column {columnIndex + 1}</Text>
			<LabelledInput
				label='Content'
				control={control}
				inputProps={inputProps}
				name={`${section}.${rowIndex}.columns.${columnIndex}.text`}
			/>
			<LabelledInput
				label='Width'
				control={control}
				inputProps={inputProps}
				name={`${section}.${rowIndex}.columns.${columnIndex}.width`}
			/>
			<Text alignSelf='flex-start'>Margins</Text>
			<LabelledInput
				isNumber
				label='Left:'
				control={control}
				inputProps={inputProps}
				name={`${section}.${rowIndex}.columns.${columnIndex}.margin.0`}
			/>
			<LabelledInput
				isNumber
				label='Top:'
				control={control}
				inputProps={inputProps}
				name={`${section}.${rowIndex}.columns.${columnIndex}.margin.1`}
			/>
			<LabelledInput
				isNumber
				label='Right:'
				control={control}
				inputProps={inputProps}
				name={`${section}.${rowIndex}.columns.${columnIndex}.margin.2`}
			/>
			<LabelledInput
				isNumber
				label='Bottom:'
				control={control}
				inputProps={inputProps}
				name={`${section}.${rowIndex}.columns.${columnIndex}.margin.3`}
			/>
		</VStack>
	);
};
