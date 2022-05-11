import './App.scss';
import { useState } from 'react';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Checkbox, Heading, HStack, Input, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Wizard } from './wizard/types/wizard.values';
import { createDef } from './wizard-to-def';
import { mapFormField } from './wizard/helpers/map-form-field';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
	const { watch, control, register } = useForm<Wizard>({
		defaultValues: {
			content: [{ text: 'vvvv' }],
			header: [{ text: 'lol headerek' }],
			footer: [{ text: 'lol footerek' }],
			pageMargins: ['0', '0', '0', '0']
		}
	});

	const def = createDef(watch() as any);
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
				<Controller
					control={control as any}
					name='hasHeader'
					render={({ field: { onChange, value } }) => (
						<Checkbox isChecked={!!value} value={value} onChange={onChange}>
							Header
						</Checkbox>
					)}
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
				Page margins
				<HStack alignItems='center'>
					Left:
					<Controller
						control={control as any}
						name='pageMargins.0'
						render={({ field }) => (
							<Input
								{...mapFormField(field as any)}
								ref={undefined}
								marginX={3}
								width={60}
							/>
						)}
					/>
					Top:
					<Controller
						control={control as any}
						name='pageMargins.1'
						render={({ field }) => (
							<Input
								{...mapFormField(field as any)}
								ref={undefined}
								marginX={3}
								width={60}
							/>
						)}
					/>
					Right:
					<Controller
						control={control as any}
						name='pageMargins.2'
						render={({ field }) => (
							<Input
								{...mapFormField(field as any)}
								ref={undefined}
								marginX={3}
								width={60}
							/>
						)}
					/>
					Bottom:
					<Controller
						control={control as any}
						name='pageMargins.3'
						render={({ field }) => (
							<Input
								{...mapFormField(field as any)}
								ref={undefined}
								marginX={3}
								width={60}
							/>
						)}
					/>
				</HStack>
			</VStack>
			<VStack w='50%'>
				<div id='iframeContainer'></div>
			</VStack>
		</HStack>
	);
}

export default App;
