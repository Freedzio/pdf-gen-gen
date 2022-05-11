import { Margins, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Wizard } from './wizard/types/wizard.values';

export const createDef = (wizard: Wizard): TDocumentDefinitions => {
	console.log(wizard.pageMargins);
	return {
		header: wizard.hasHeader ? wizard.header : undefined,
		footer: wizard.hasFooter ? wizard.footer : undefined,
		content: wizard.content,
		pageMargins: wizard.pageMargins.map((m) => parseInt(m)) as Margins
	};
};
