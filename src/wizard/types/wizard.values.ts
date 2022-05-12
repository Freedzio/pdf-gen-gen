import { Content, ContentStack, Margins } from 'pdfmake/interfaces';

export type Wizard = {
	hasHeader: boolean;
	hasFooter: boolean;
	header: Content;
	footer: Content;
	content: Content;
	pageMargins: [string, string, string, string];
};

export type Section = 'header' | 'content' | 'footer';
