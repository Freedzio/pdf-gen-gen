import React, { CSSProperties, useState } from 'react';
import { Col, Input, Row } from 'reactstrap';
import { LabelledInput } from './labelled-input.component';
import { ContentType } from './section.controller';

type Props = {
	columnIndex: number;
	control: any;
	namePrefix: string;
	onContentTypeChange: (namePrefix: string, contentType: ContentType) => void;
};

export const TextController: React.FC<Props> = ({
	columnIndex,
	control,
	namePrefix,
	onContentTypeChange
}) => {
	const inputStyle: CSSProperties = {
		marginLeft: 2,
		width: '169px'
	};

	const contentTypes: ContentType[] = ['text', 'stack'];

	const onSelectChange = (contentType: string) => {
		onContentTypeChange(namePrefix, contentType as ContentType);
	};

	return (
		<Col>
			<span className='align-self-start'>Column {columnIndex + 1}</span>
			<div className='d-flex align-items-center'>
				<span className='align-self-start'>Type</span>
				<Input
					type='select'
					onChange={(e) => onSelectChange(e.target.value)}
					style={inputStyle}
				>
					{contentTypes.map((ct) => (
						<option key={ct} label={ct} value={ct} />
					))}
				</Input>
			</div>
			<LabelledInput
				label='Content'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.text`}
			/>
			<LabelledInput
				label='Width'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.width`}
			/>
			<LabelledInput
				label='Font size'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.fontSize`}
			/>
			<LabelledInput
				label='Line height'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.lineHeight`}
			/>
			<LabelledInput
				label='Color'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.color`}
			/>
			<span className='align-self-start'>Margins</span>
			<LabelledInput
				isNumber
				label='Left:'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.margin.0`}
			/>
			<LabelledInput
				isNumber
				label='Top:'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.margin.1`}
			/>
			<LabelledInput
				isNumber
				label='Right:'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.margin.2`}
			/>
			<LabelledInput
				isNumber
				label='Bottom:'
				control={control}
				inputStyle={inputStyle}
				name={`${namePrefix}.margin.3`}
			/>
		</Col>
	);
};
