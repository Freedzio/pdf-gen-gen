import React, { CSSProperties } from 'react';
import { Col, Button, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { isCellOfType } from '../helpers/is-cell-of-type';
import { CellTypeController } from './cell-type.controller';
import { QrController } from './qr.controller';
import { TextController } from './text.controller';

export const inputStyle: CSSProperties = {
	marginLeft: 2,
	width: '169px'
};

type Props = {
	control: any;
	getValues: (key: string) => any;
	setValue: (name: string, value: any) => void;
	namePrefix: string;
	rowIndex: number;
	columnIndex: number;
	onColumnDelete: () => void;
};

export const ColumnController: React.FC<Props> = ({
	control,
	getValues,
	setValue,
	namePrefix,
	columnIndex,
	onColumnDelete
}) => {
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

		if (isCellOfType(getValues(namePrefix), 'qr')) {
			return (
				<QrController
					control={control}
					namePrefix={namePrefix}
					inputStyle={inputStyle}
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
					<CellTypeController
						namePrefix={namePrefix}
						inputStyle={inputStyle}
						setValue={setValue}
					/>
					{getCellController(namePrefix)}
					<Button onClick={onColumnDelete} color='danger' className='ml-auto'>
						Delete column
					</Button>
				</PopoverBody>
			</UncontrolledPopover>
		</Col>
	);
};
