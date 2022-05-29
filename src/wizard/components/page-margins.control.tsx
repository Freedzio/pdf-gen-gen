import React from 'react';
import { LabelledInput } from './labelled-input.component';

type Props = {
	control: any;
};

export const PageMarginsControl: React.FC<Props> = ({ control }) => {
	return (
		<>
			Page margins
			<div className='d-flex align-items-center'>
				<LabelledInput label='Left:' control={control} name='pageMargins.0' />
				<LabelledInput label='Top:' control={control} name='pageMargins.1' />
				<LabelledInput label='Right:' control={control} name='pageMargins.2' />
				<LabelledInput label='Bottom:' control={control} name='pageMargins.3' />
			</div>
		</>
	);
};
