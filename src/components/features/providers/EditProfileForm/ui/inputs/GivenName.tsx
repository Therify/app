import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { TEST_IDS } from './testIds';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface GivenNameInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
}

export const GivenNameInput = ({
    control,
    defaultValue = '',
}: GivenNameInputProps) => (
    <Controller
        control={control}
        name="givenName"
        defaultValue={defaultValue}
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
                autoComplete="first-name"
                data-testid={TEST_IDS.FIRST_NAME}
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);