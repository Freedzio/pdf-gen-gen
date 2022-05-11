import './App.scss';
import { Button, Col, Container, Row } from 'reactstrap';
import { useState } from 'react';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
	const [def, setDef] = useState<TDocumentDefinitions>({
		footer: undefined,
		header: undefined,
		content: [{ text: 'asdasdasd' }]
	});

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
		<Container>
			<Row>
				<Col>wizard</Col>
				<Col>
					preview
					<div id='iframeContainer'></div>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
