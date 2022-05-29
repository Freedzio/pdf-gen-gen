import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { textCell } from '../cells/text.cell';
import { getRowName } from '../helpers/get-row-name';
import { isCellOfType } from '../helpers/is-cell-of-type';
import { ColumnController } from './column.controller';

type Props = {
	control: any;
	setValue: (name: any, value: any) => void;
	getValues: (key: string) => any;
	section: string;
};

export type ContentType = 'stack' | 'text';

export const SectionController: React.FC<Props> = ({
	control,
	setValue,
	getValues,
	section
}) => {
	const rows = getValues(section);

	const getRowColumns = (rowIndex: number) => rows[rowIndex].columns;

	const addSectionRow = () =>
		setValue(getRowName(section, rows.length), { columns: [textCell] });

	const addSectionColumn = (rowIndex: number) =>
		setValue(getColumnName(rowIndex, getRowColumns(rowIndex).length), textCell);

	const getColumnName = (rowIndex: number, columnIndex: number) =>
		`${getRowName(section, rowIndex)}.columns.${columnIndex}`;

	const deleteRow = (rowIndex: number) => {
		const newSection = getValues(section).filter(
			(r: any, index: number) => index !== rowIndex
		);

		setValue(section, newSection);
	};

	const onColumnDelete = (rowIndex: number, columnIndex: number) => {
		const newRow = getRowColumns(rowIndex).filter(
			(c: any, index: number) => index !== columnIndex
		);
		setValue(getRowName(section, rowIndex), { columns: newRow });
	};

	return (
		<Row
			style={{
				borderStyle: 'solid',
				borderRightWidth: 2,
				borderColor: 'black'
			}}
		>
			<Col>
				{(getValues(section) as any)?.map((row: any, rowIndex: number) => (
					<Row key={`r${rowIndex}`}>
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

										return isCellOfType(getValues(namePrefix), 'stack') ? (
											<Col sm='auto' key={namePrefix}>
												<SectionController
													control={control}
													setValue={setValue}
													getValues={getValues}
													section={`${namePrefix}.stack`}
												/>
											</Col>
										) : (
											<ColumnController
												rowIndex={rowIndex}
												columnIndex={columnIndex}
												setValue={setValue}
												getValues={getValues}
												namePrefix={namePrefix}
												control={control}
												onColumnDelete={() =>
													onColumnDelete(rowIndex, columnIndex)
												}
											/>
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
				<Button onClick={addSectionRow} color='primary'>
					Add row
				</Button>
			</Col>
		</Row>
	);
};
