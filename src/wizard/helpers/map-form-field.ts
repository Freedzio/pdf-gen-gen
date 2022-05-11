import { ControllerRenderProps, Path } from 'react-hook-form';

export const mapFormField = <S>(field: ControllerRenderProps<S, Path<S>>) => {
	(field as any).onChangeText = field.onChange;
	(field as any).onValueChange = field.onChange;

	return field;
};
