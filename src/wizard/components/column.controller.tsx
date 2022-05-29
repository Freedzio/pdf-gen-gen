import React, { CSSProperties } from 'react';
import {
	Col,
	Button,
	UncontrolledPopover,
	PopoverBody,
	Input
} from 'reactstrap';
import { stackCell } from '../cells/stack.cell';
import { textCell } from '../cells/text.cell';
import { isCellOfType } from '../helpers/is-cell-of-type';
import { ContentType } from './section.controller';
import { TextController } from './text.controller';

const inputStyle: CSSProperties = {
	marginLeft: 2,
	width: '169px'
};

const cellDict = {
	text: textCell,
	stack: stackCell
};

const contentTypes: ContentType[] = ['text', 'stack'];

type Props = {
	control: any;
	setValue: (name: any, value: any) => void;
	getValues: (key: string) => any;
	namePrefix: string;
	rowIndex: number;
	columnIndex: number;
	onColumnDelete: () => void;
};

export const ColumnController: React.FC<Props> = ({
	control,
	setValue,
	getValues,
	namePrefix,
	columnIndex,
	onColumnDelete
}) => {
	const onContentTypeChange = (namePrefix: string, contentType: ContentType) =>
		setValue(namePrefix, cellDict[contentType]);

	const getCellController = (namePrefix: string) => {
		if (isCellOfType(getValues(namePrefix), 'text')) {
			return (
				<TextController
					inputStyle={inputStyle}
					control={control}
					namePrefix={namePrefix}
				/>
			);
		}
	};

	const getNameForPopover = (namePrefix: string) =>
		namePrefix.replace(/\./g, '');

	return (
		<Col key={namePrefix} sm='auto'>
			<Button
				type='button'
				id={getNameForPopover(namePrefix)}
				className='align-self-start'
			>
				Column {columnIndex + 1}
			</Button>
			<UncontrolledPopover
				trigger='legacy'
				target={getNameForPopover(namePrefix)}
			>
				<PopoverBody>
					<div>
						<span>{namePrefix}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div>
							<span className='align-self-start'>Type</span>
						</div>
						<Input
							type='select'
							style={inputStyle}
							onChange={(e) =>
								onContentTypeChange(namePrefix, e.target.value as ContentType)
							}
						>
							{contentTypes.map((ct) => (
								<option key={ct} label={ct} value={ct} />
							))}
						</Input>
					</div>
					{getCellController(namePrefix)}
					<Button onClick={onColumnDelete} color='danger' className='ml-auto'>
						Delete column
					</Button>
				</PopoverBody>
			</UncontrolledPopover>
		</Col>
	);
};
