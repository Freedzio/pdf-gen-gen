import './App.scss';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Checkbox, HStack, Text, VStack, View } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Section, Wizard } from './wizard/types/wizard.values';
import { createDef } from './wizard-to-def';
import { PageMarginsControl } from './wizard/components/page-margins.control';
import { CellController } from './wizard/components/cell.controller';
import { SectionController } from './wizard/components/section.controller';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
	const { watch, control, setValue } = useForm<Wizard>({
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

	pdfDocGenerator.getDataUrl((dataUrl) => {
		const targetElement = document.querySelector('#iframeContainer');
		const iframe = document.createElement('iframe');
		iframe.style.width = '100%';
		iframe.style.height = '100vh';
		iframe.src = dataUrl;
		targetElement?.replaceChildren(iframe);
	});

	return (
		<HStack>
			<VStack w='50%' padding={5}>
				<View>
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
						section='header'
						values={values}
					/>
				)}
				<SectionController
					control={control}
					setValue={setValue}
					section='content'
					values={values}
				/>
				<Controller
					control={control as any}
					name='hasFooter'
					render={({ field: { onChange, value } }) => (
						<Checkbox isChecked={!!value} value={value} onChange={onChange}>
							Footer
						</Checkbox>
					)}
				/>
				{!!values.hasFooter && (
					<SectionController
						control={control}
						setValue={setValue}
						section='footer'
						values={values}
					/>
				)}
				<PageMarginsControl control={control} />
			</VStack>
			<VStack w='50%'>
				<div id='iframeContainer'></div>
			</VStack>
		</HStack>
	);
}

export default App;
