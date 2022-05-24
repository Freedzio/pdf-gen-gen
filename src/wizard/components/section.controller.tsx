import { capitalize } from 'lodash';
import { VStack, HStack, Button, Text } from 'native-base';
import React from 'react';
import { Section } from '../types/wizard.values';
import { CellController } from './cell.controller';

type Props = {
	control: any;
	setValue: (a: any, b: any) => void;
	getValues: (key: string) => void;
	values: any;
	section: string;
};

export type ContentType = 'stack' | 'text';

const textCell = {
	text: 'New column',
	width: 'auto',
	margin: [10, 10, 10, 10],
	fontSize: 14,
	lineHeight: 1,
	color: 'black'
};

const stackCell = {
	stack: []
};

export const SectionController: React.FC<Props> = ({
	control,
	setValue,
	getValues,
	values,
	section
}) => {
	const addSectionRow = (section: string) => {
		// @ts-ignore
		setValue(section, [
			...(getValues(section) as any),
			{ columns: [textCell] }
		]);
	};

	const addSectionColumn = (section: string, rowIndex: number) => {
		setValue(`${section}.${rowIndex}.columns`, [
			...(getValues(section) as any)[rowIndex].columns,
			textCell
		]);
	};

	return (
		<VStack borderStyle='solid' borderWidth={2} borderColor='black'>
			<Text fontSize='3xl'>{capitalize(section)}</Text>
			{(getValues(section) as any)?.map((row: any, rowIndex: number) => (
				<VStack
					borderTopWidth={2}
					borderColor='black'
					borderStyle='solid'
					key={`r${rowIndex}`}
				>
					<HStack>
						<Text fontSize='xl'>Row {rowIndex + 1}</Text>
						<Button marginLeft={2} colorScheme='danger' size='xs'>
							Delete row
						</Button>
					</HStack>
					<HStack flexWrap='wrap'>
						{(row.columns as any).map((column: any, columnIndex: number) => {
							const namePrefix = `${section}.${rowIndex}.columns.${columnIndex}`;
							return (
								<CellController
									columnIndex={columnIndex}
									control={control}
									key={`c${columnIndex}`}
									namePrefix={namePrefix}
								/>
							);
						})}
						<Button
							alignSelf='end'
							onPress={() => addSectionColumn(section, rowIndex)}
						>
							Add column
						</Button>
					</HStack>
				</VStack>
			))}
			<Button onPress={() => addSectionRow(section)}>Add row</Button>
		</VStack>
	);
};
