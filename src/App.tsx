import './App.scss';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Checkbox, HStack, Text, VStack, View } from 'native-base';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Section, Wizard } from './wizard/types/wizard.values';
import { createDef } from './wizard-to-def';
import { PageMarginsControl } from './wizard/components/page-margins.control';
import { SectionController } from './wizard/components/section.controller';
import { useEffect } from 'react';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
	const { watch, control, setValue, getValues } = useForm<Wizard>({
		defaultValues: {
			content: [],
			header: [],
			footer: [],
			pageMargins: ['40', '40', '40', '40']
		}
	});

	const values = watch();
	const def = createDef(values as Wizard);
	const pdfDocGenerator = pdfMake.createPdf(def);

	useEffect(() => {
		pdfDocGenerator.getDataUrl((dataUrl) => {
			const targetElement = document.querySelector('#iframeContainer');
			const iframe = document.createElement('iframe');
			iframe.style.width = '100%';
			iframe.style.height = '100vh';
			iframe.src = dataUrl;
			targetElement?.replaceChildren(iframe);
		});
	});

	return (
		<HStack>
			<VStack w='50%' padding={2}>
				<PageMarginsControl control={control} />
				<View marginY={4}>
					<Controller
						control={control as any}
						name='hasHeader'
						render={({ field: { onChange, value } }) => (
							<Checkbox isChecked={!!value} value={value} onChange={onChange}>
								Header
							</Checkbox>
						)}
					/>
				</View>
				{!!values.hasHeader && (
					// @ts-ignore
					<SectionController
						control={control}
						setValue={setValue}
						getValues={getValues}
						section='header'
					/>
				)}
				<SectionController
					control={control}
					setValue={setValue}
					getValues={getValues}
					section='content'
				/>
				<View marginY={4}>
					<Controller
						control={control as any}
						name='hasFooter'
						render={({ field: { onChange, value } }) => (
							<Checkbox isChecked={!!value} value={value} onChange={onChange}>
								Footer
							</Checkbox>
						)}
					/>
				</View>
				{!!values.hasFooter && (
					<SectionController
						control={control}
						setValue={setValue}
						getValues={getValues}
						section='footer'
					/>
				)}
			</VStack>
			<VStack w='50%'>
				<div id='iframeContainer'></div>
			</VStack>
		</HStack>
	);
}

export default App;
