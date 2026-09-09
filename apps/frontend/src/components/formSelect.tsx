import { Controller, type Control, type ControllerRenderProps, type FieldValues, type Path, type RegisterOptions } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FormSelectProps<T extends FieldValues> {
    id?: string;
    name: Path<T>;
    control: Control<T>;
    options: { label: string; value: string | null }[];
    rules?: RegisterOptions<T, Path<T>>;
    disabled?: boolean;
    defaultValue?: null | undefined;
    alignItemWithTrigger?: boolean;
}

export function FormSelect<T extends FieldValues>({
    id,
    name,
    control,
    options,
    rules,
    disabled,
    defaultValue,
    alignItemWithTrigger = false,
}: FormSelectProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }: { field: ControllerRenderProps<T, Path<T>>}) => (
                <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={disabled}
                    items={options}
                    id={id}
                    defaultValue={defaultValue}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={alignItemWithTrigger}>
                        <SelectGroup>
                            {options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        />
    );
}