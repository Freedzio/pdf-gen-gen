import './App.scss';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Checkbox, HStack, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Wizard } from './wizard/types/wizard.values';
import { createDef } from './wizard-to-def';
import { PageMarginsControl } from './wizard/components/page-margins.control';
import { LabelledInput } from './wizard/components/labelled-input.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
	const { watch, control, setValue } = useForm<Wizard>({
		defaultValues: {
			content: [{ text: '' }],
			header: [],
			footer: [{ text: 'lol footer' }],
			pageMargins: ['40', '40', '40', '40']
		}
	});

	const values = watch();
	const def = createDef(values as Wizard);
	const pdfDocGenerator = pdfMake.createPdf(def);

	pdfDocGenerator.getDataUrl((dataUrl) => {
		const targetElement = document.querySelector('#iframeContainer');
		const iframe = document.createElement('iframe');
		iframe.style.width = '100%';
		iframe.style.height = '100vh';
		iframe.src = dataUrl;
		targetElement?.replaceChildren(iframe);
	});

	const addHeaderRow = () => {
		// @ts-ignore
		setValue('header', [...(values.header as any), { columns: [{}] }]);
	};

	const addHeaderColumn = (rowIndex: number) => {
		setValue(`header.${rowIndex}.columns`, [
			...(values.header as any)[rowIndex].columns,
			{}
		]);
	};

	return (
		<HStack>
			<VStack w='50%' padding={5}>
				<Controller
					control={control as any}
					name='hasHeader'
					render={({ field: { onChange, value } }) => (
						<Checkbox isChecked={!!value} value={value} onChange={onChange}>
							Header
						</Checkbox>
					)}
				/>
				{!!values.hasHeader && (
					<VStack>
						{(values.header as any).map((row: any, rowIndex: number) => (
							<HStack marginY={2} flexWrap='wrap'>
								{(row.columns as any).map(
									(column: any, columnIndex: number) => (
										<VStack>
											<Text>Column {columnIndex + 1}</Text>
											<LabelledInput
												label='Content'
												control={control}
												inputProps={{ marginX: 2 }}
												name={`header.${rowIndex}.columns.${columnIndex}.text`}
											/>
											<LabelledInput
												isNumber
												label='Margin'
												control={control}
												inputProps={{ marginX: 2 }}
												name={`header.${rowIndex}.columns.${columnIndex}.margin`}
											/>
										</VStack>
									)
								)}
								<Button
									alignSelf='end'
									onPress={() => addHeaderColumn(rowIndex)}
								>
									Add column
								</Button>
							</HStack>
						))}
						<Button onPress={addHeaderRow}>Add row</Button>
					</VStack>
				)}
				<Controller
					control={control as any}
					name='hasFooter'
					render={({ field: { onChange, value } }) => (
						<Checkbox isChecked={!!value} value={value} onChange={onChange}>
							Footer
						</Checkbox>
					)}
				/>
				<PageMarginsControl control={control} />
			</VStack>
			<VStack w='50%'>
				<div id='iframeContainer'></div>
			</VStack>
		</HStack>
	);
}

export default App;
