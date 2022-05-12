import { capitalize } from 'lodash';
import { VStack, HStack, Button, Text } from 'native-base';
import React from 'react';
import { Section } from '../types/wizard.values';
import { CellController } from './cell.controller';

type Props = {
	control: any;
	setValue: (a: any, b: any) => void;
	values: any;
	section: Section;
};

export const SectionController: React.FC<Props> = ({
	control,
	setValue,
	values,
	section
}) => {
	const addSectionRow = (section: Section) => {
		// @ts-ignore
		setValue(section, [...(values[section] as any), { columns: [{}] }]);
	};

	const addSectionColumn = (section: Section, rowIndex: number) => {
		setValue(`${section}.${rowIndex}.columns`, [
			...(values[section as any] as any)[rowIndex].columns,
			{}
		]);
	};

	return (
		<VStack marginBottom={10}>
			<Text fontSize='2xl'>{capitalize(section)}</Text>

			{(values[section as any] as any)?.map((row: any, rowIndex: number) => (
				<HStack marginY={2} flexWrap='wrap'>
					{(row.columns as any).map((column: any, columnIndex: number) => (
						<CellController
							rowIndex={rowIndex}
							columnIndex={columnIndex}
							control={control}
							section={section}
						/>
					))}
					<Button
						alignSelf='end'
						onPress={() => addSectionColumn(section, rowIndex)}
					>
						Add column
					</Button>
				</HStack>
			))}
			<Button onPress={() => addSectionRow(section)}>Add row</Button>
		</VStack>
	);
};
