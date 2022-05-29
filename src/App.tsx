import './App.scss';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Controller, useForm } from 'react-hook-form';
import { Wizard } from './wizard/types/wizard.values';
import { createDef } from './wizard-to-def';
import { PageMarginsControl } from './wizard/components/page-margins.control';
import { SectionController } from './wizard/components/section.controller';
import { useEffect } from 'react';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
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
		<Container fluid>
			<Row>
				<Col>
					<PageMarginsControl control={control} />
					<Controller
						control={control as any}
						name='hasHeader'
						render={({ field: { onChange, value } }) => (
							<FormGroup check>
								<Input type='checkbox' value={value} onChange={onChange} />
								<Label check>Header</Label>
							</FormGroup>
						)}
					/>
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

					<Controller
						control={control as any}
						name='hasFooter'
						render={({ field: { onChange, value } }) => (
							<FormGroup check>
								<Input type='checkbox' value={value} onChange={onChange} />
								<Label check>Footer</Label>
							</FormGroup>
						)}
					/>
					{!!values.hasFooter && (
						<SectionController
							control={control}
							setValue={setValue}
							getValues={getValues}
							section='footer'
						/>
					)}
				</Col>
				<Col>
					<div id='iframeContainer'></div>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
