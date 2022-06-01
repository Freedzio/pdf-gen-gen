import React, { CSSProperties } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'reactstrap';
import { CellMarginsController } from './cell-margins.controller';
import { LabelledInput } from './labelled-input.component';
import { SelectInput } from './select-input.component';

type Props = {
	control: any;
	namePrefix: string;
	inputStyle: CSSProperties;
};

const options = [
	{ name: 'Low', value: 'L' },
	{ name: 'Medium', value: 'M' },
	{ name: 'Quartile', value: 'Q' },
	{ name: 'High', value: 'H' }
];

export const QrController: React.FC<Props> = ({
	control,
	namePrefix,
	inputStyle
}) => {
	return (
		<div>
			<LabelledInput
				label='Content'
				control={control}
				name={`${namePrefix}.qr`}
			/>
			<LabelledInput
				label='Width'
				control={control}
				name={`${namePrefix}.width`}
			/>
			<LabelledInput
				label='Color'
				control={control}
				name={`${namePrefix}.foreground`}
			/>
			<LabelledInput
				label='Background'
				control={control}
				name={`${namePrefix}.background`}
			/>
			<LabelledInput label='Fit' control={control} name={`${namePrefix}.fit`} />
			<Controller
				control={control}
				name={`${namePrefix}.eccLevel`}
				render={({ field }) => (
					<SelectInput
						options={options}
						value={field.value}
						onChange={field.onChange}
						label='Ecc Level'
					/>
				)}
			/>
			<CellMarginsController control={control} namePrefix={namePrefix} />
		</div>
	);
};
