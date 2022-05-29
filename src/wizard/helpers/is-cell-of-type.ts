import { ContentType } from '../components/section.controller';

export const isCellOfType = (
	cellValue: any,
	contentType: ContentType
): boolean => Object.hasOwn(cellValue, contentType);
