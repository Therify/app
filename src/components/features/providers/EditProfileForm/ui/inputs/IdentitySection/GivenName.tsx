import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface GivenNameInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const GivenNameInput = ({ control, disabled }: GivenNameInputProps) => (
    <Controller
        control={control}
        name="givenName"
        defaultValue=""
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                required
                fullWidth
                id="givenName"
                label="First Name"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'First Name'
                          )
                        : undefined
                }
                {...{
                    disabled,
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
