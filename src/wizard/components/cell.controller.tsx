import { VStack, Text, HStack, Select } from 'native-base';
import React, { useState } from 'react';
import { LabelledInput } from './labelled-input.component';
import { ContentType } from './section.controller';

type Props = {
	columnIndex: number;
	control: any;
	namePrefix: string;
	onContentTypeChange: (namePrefix: string, contentType: ContentType) => void;
};

export const CellController: React.FC<Props> = ({
	columnIndex,
	control,
	namePrefix,
	onContentTypeChange
}) => {
	const inputProps = {
		marginX: 2,
		width: '169px'
	};

	const contentTypes: ContentType[] = ['text', 'stack'];

	const [selectedType, setSelectedType] = useState<ContentType>('text');

	const onSelectChange = (contentType: string) => {
		setSelectedType(contentType as ContentType);
		onContentTypeChange(namePrefix, contentType as ContentType);
	};

	return (
		<VStack alignItems='flex-end' borderColor='black' borderStyle='solid'>
			<Text alignSelf='flex-start'>Column {columnIndex + 1}</Text>
			<HStack alignItems='center'>
				<Text w='20%' alignSelf='flex-start'>
					Type
				</Text>
				<Select
					selectedValue={selectedType}
					onValueChange={onSelectChange}
					{...inputProps}
				>
					{contentTypes.map((ct) => (
						<Select.Item key={ct} label={ct} value={ct} />
					))}
				</Select>
			</HStack>
			<LabelledInput
				label='Content'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.text`}
			/>
			<LabelledInput
				label='Width'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.width`}
			/>
			<LabelledInput
				label='Font size'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.fontSize`}
			/>
			<LabelledInput
				label='Line height'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.lineHeight`}
			/>
			<LabelledInput
				label='Color'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.color`}
			/>
			<Text alignSelf='flex-start'>Margins</Text>
			<LabelledInput
				isNumber
				label='Left:'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.margin.0`}
			/>
			<LabelledInput
				isNumber
				label='Top:'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.margin.1`}
			/>
			<LabelledInput
				isNumber
				label='Right:'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.margin.2`}
			/>
			<LabelledInput
				isNumber
				label='Bottom:'
				control={control}
				inputProps={inputProps}
				name={`${namePrefix}.margin.3`}
			/>
		</VStack>
	);
};
