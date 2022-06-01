import React, { CSSProperties } from 'react';
import { Input } from 'reactstrap';
import { inputStyle } from './column.controller';

type Props = {
	onChange: (e: any) => void;
	value?: string;
	options: { name: string; value: string }[];
	label: string;
};

export const SelectInput: React.FC<Props> = ({
	onChange,
	value,
	label,
	options
}) => {
	return (
		<div className='d-flex align-items-center justify-content-between'>
			<div>
				<span className='align-self-start'>{label}</span>
			</div>
			<Input
				value={value}
				type='select'
				style={inputStyle}
				onChange={(e) => onChange(e.target.value)}
			>
				{options.map((o) => (
					<option key={o.value} value={o.value}>
						{o.name}
					</option>
				))}
			</Input>
		</div>
	);
};
