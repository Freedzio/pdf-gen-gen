import React from 'react';
import { inputStyle } from './column.controller';
import { LabelledInput } from './labelled-input.component';

type Props = {
	namePrefix: string;
	control: any;
};

export const CellMarginsController: React.FC<Props> = ({
	control,
	namePrefix
}) => {
	return (
		<>
			<span className='align-self-start'>Margins</span>
			<LabelledInput
				isNumber
				label='Left:'
				control={control}
				name={`${namePrefix}.margin.0`}
			/>
			<LabelledInput
				isNumber
				label='Top:'
				control={control}
				name={`${namePrefix}.margin.1`}
			/>
			<LabelledInput
				isNumber
				label='Right:'
				control={control}
				name={`${namePrefix}.margin.2`}
			/>
			<LabelledInput
				isNumber
				label='Bottom:'
				control={control}
				name={`${namePrefix}.margin.3`}
			/>
		</>
	);
};
