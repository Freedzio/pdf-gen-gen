import React, { CSSProperties, useState } from 'react';
import { CellMarginsController } from './cell-margins.controller';
import { LabelledInput } from './labelled-input.component';

type Props = {
	control: any;
	namePrefix: string;
	inputStyle: CSSProperties;
};

export const TextController: React.FC<Props> = ({ control, namePrefix }) => {
	return (
		<div>
			<LabelledInput
				label='Content'
				control={control}
				name={`${namePrefix}.text`}
			/>
			<LabelledInput
				label='Width'
				control={control}
				name={`${namePrefix}.width`}
			/>
			<LabelledInput
				label='Font size'
				control={control}
				name={`${namePrefix}.fontSize`}
			/>
			<LabelledInput
				label='Line height'
				control={control}
				name={`${namePrefix}.lineHeight`}
			/>
			<LabelledInput
				label='Color'
				control={control}
				name={`${namePrefix}.color`}
			/>
			<CellMarginsController control={control} namePrefix={namePrefix} />
		</div>
	);
};
