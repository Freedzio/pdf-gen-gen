import React, { CSSProperties } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
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

const inputStyle: CSSProperties = {
	marginLeft: 2,
	width: '169px'
};

const contentTypes: ContentType[] = ['text', 'stack'];

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

	const getCellController = (namePrefix: string) => {
		if (isCellOfType(namePrefix, 'text')) {
			return (
				<TextController
					inputStyle={inputStyle}
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
	};

	return (
		<Row>
			<Col>
				{(getValues(section) as any)?.map((row: any, rowIndex: number) => (
					<Row
						key={`r${rowIndex}`}
						style={{
							borderStyle: 'solid',
							borderRightWidth: 2,
							borderColor: 'black'
						}}
					>
						<Col>
							<Row>
								<Col>
									<span>Row {rowIndex + 1}</span>
								</Col>
								<Col sm='auto'>
									<Button onClick={() => deleteRow(rowIndex)} color='danger'>
										Delete row
									</Button>
								</Col>
							</Row>
							<Row>
								{(row.columns as any).map(
									(column: any, columnIndex: number) => {
										const namePrefix = getColumnName(rowIndex, columnIndex);

										return (
											<Col>
												<span className='align-self-start'>
													Column {columnIndex + 1}
												</span>

												<div className='d-flex align-items-center justify-content-between'>
													<span className='align-self-start'>Type</span>
													<Input
														type='select'
														style={inputStyle}
														onChange={(e) =>
															onContentTypeChange(
																namePrefix,
																e.target.value as ContentType
															)
														}
													>
														{contentTypes.map((ct) => (
															<option key={ct} label={ct} value={ct} />
														))}
													</Input>
												</div>
												{getCellController(namePrefix)}
											</Col>
										);
									}
								)}
								<Col>
									<Button
										onClick={() => addSectionColumn(rowIndex)}
										color='primary'
									>
										Add column
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				))}
				<Button onClick={() => addSectionRow()} color='primary'>
					Add row
				</Button>
			</Col>
		</Row>
	);
};
