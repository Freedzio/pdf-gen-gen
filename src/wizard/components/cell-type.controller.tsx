import React, { CSSProperties } from 'react';
import { qrCell } from '../cells/qr.cell';
import { stackCell } from '../cells/stack.cell';
import { textCell } from '../cells/text.cell';
import { ContentType } from './section.controller';
import { SelectInput } from './select-input.component';

const cellDict = {
	text: textCell,
	stack: stackCell,
	qr: qrCell
};
type Props = {
	inputStyle: CSSProperties;
	setValue: (name: string, value: any) => void;
	namePrefix: string;
};

const contentTypes: ContentType[] = ['text', 'stack', 'qr'];

export const CellTypeController: React.FC<Props> = ({
	setValue,
	namePrefix
}) => {
	const onContentTypeChange = (contentType: ContentType) =>
		setValue(namePrefix, cellDict[contentType]);

	return (
		<SelectInput
			label='Type'
			options={contentTypes.map((ct) => ({ name: ct, value: ct }))}
			onChange={onContentTypeChange}
		/>
	);
};
