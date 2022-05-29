import React, { CSSProperties, useState } from 'react';
import { Col, Input, Row } from 'reactstrap';
import { LabelledInput } from './labelled-input.component';
import { ContentType } from './section.controller';

type Props = {
	control: any;
	namePrefix: string;
	inputStyle: CSSProperties;
};

export const TextController: React.FC<Props> = ({
	control,
	namePrefix,
	inputStyle
}) => {
	return (
		<div>
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
		</div>
	);
};
