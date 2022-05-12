import { ControllerRenderProps, Path } from 'react-hook-form';
import { boolean } from 'yup';

export const mapFormField = <S>(
	field: ControllerRenderProps<S, Path<S>>,
	isNumber?: boolean
) => {
	(field as any).onChangeText = !!isNumber
		? (v: any) => field.onChange(parseInt(v))
		: field.onChange;
	(field as any).onValueChange = !!isNumber
		? (v: any) => field.onChange(parseInt(v))
		: field.onChange;

	return field;
};
