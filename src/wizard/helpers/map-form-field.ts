import { ControllerRenderProps, Path } from 'react-hook-form';

export const mapFormField = <S>(
	field: ControllerRenderProps<S, Path<S>>,
	isNumber?: boolean
) => {
	let changeHandler = field.onChange;
	if (!!isNumber)
		changeHandler = (v: any) =>
			field.onChange(isNaN(parseInt(v)) ? 0 : parseInt(v));

	// (field as any).onChangeText = changeHandler;
	// (field as any).onValueChange = changeHandler;

	return field;
};
