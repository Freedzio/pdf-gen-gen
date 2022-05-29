import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { TextController } from './text.controller';

type Props = {
	control: any;
	setValue: (name: any, value: any) => void;
	getValues: (key: string) => any;
	section: string;
};

export type ContentType = 'stack' | 'text';

const textCell = {
	text: 'New column',
	width: '*',
	margin: [10, 10, 10, 10],
	fontSize: 14,
	lineHeight: 1,
	color: 'black'
};

const stackCell = {
	stack: []
};

const cellDict = {
	text: textCell,
	stack: stackCell
};

export const SectionController: React.FC<Props> = ({
	control,
	setValue,
	getValues,
	section
}) => {
	const rows = getValues(section);

	const getRowColumns = (rowIndex: number) => rows[rowIndex].columns;

	const addSectionRow = () =>
		setValue(getRowName(rows.length), { columns: [textCell] });

	const getRowName = (rowIndex: number) => `${section}.${rowIndex}`;

	const addSectionColumn = (rowIndex: number) =>
		setValue(getColumnName(rowIndex, getRowColumns(rowIndex).length), textCell);

	const getColumnName = (rowIndex: number, columnIndex: number) =>
		`${getRowName(rowIndex)}.columns.${columnIndex}`;

	const onContentTypeChange = (namePrefix: string, contentType: ContentType) =>
		setValue(namePrefix, cellDict[contentType]);

	const isCellOfType = (
		namePrefix: string,
		contentType: ContentType
	): boolean => Object.hasOwn(getValues(namePrefix), contentType);

	const deleteColumn = (rowIndex: number, columnIndex: number) => {
		const newRow = getRowColumns(rowIndex).filter(
			(c: any, index: number) => index !== columnIndex
		);
		setValue(getRowName(rowIndex), newRow);
	};

	const deleteRow = (rowIndex: number) => {
		const newSection = getValues(section).filter(
			(r: any, index: number) => index !== rowIndex
		);

		setValue(section, newSection);
	};

	return (
		<Col
			style={{
				borderStyle: 'solid',
				borderWidth: 2,
				borderColor: 'black'
			}}
		>
			{(getValues(section) as any)?.map((row: any, rowIndex: number) => (
				<Row key={`r${rowIndex}`}>
					<Col>
						<span>Row {rowIndex + 1}</span>
						<Button onClick={() => deleteRow(rowIndex)}>Delete row</Button>
						<Row>
							{(row.columns as any).map((column: any, columnIndex: number) => {
								const namePrefix = getColumnName(rowIndex, columnIndex);

								if (isCellOfType(namePrefix, 'text')) {
									return (
										<TextController
											onContentTypeChange={onContentTypeChange}
											columnIndex={columnIndex}
											control={control}
											namePrefix={namePrefix}
										/>
									);
								}

								if (isCellOfType(namePrefix, 'stack')) {
									return (
										<SectionController
											control={control}
											setValue={setValue}
											getValues={getValues}
											section={`${namePrefix}.stack`}
										/>
									);
								}
							})}
							<Col>
								<Button onClick={() => addSectionColumn(rowIndex)}>
									Add column
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			))}
			<Button onClick={() => addSectionRow()}>Add row</Button>
		</Col>
	);
};
