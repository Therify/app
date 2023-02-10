import { Control, Controller } from 'react-hook-form';
import { Religion } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { InputWrapper } from '@/components/ui';

type Religions = typeof Religion.ENTRIES[number];

interface ReligionsInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const ReligionsInput = ({ control, disabled }: ReligionsInputProps) => (
    <Controller
        control={control}
        name="religions"
        render={({ field: { onChange, onBlur, value, name } }) => (
            <InputWrapper
                fullWidth
                label="Religions incorperated into your practice"
                helperText="If you do not incorperate faith-based practices, leave this field blank"
            >
                <Autocomplete
                    multiple
                    options={Religion.ENTRIES}
                    onChange={(_, value) => onChange(value)}
                    {...{
                        onBlur,
                        name,
                        disabled,
                        value,
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Religions incorperated into your practice"
                        />
                    )}
                />
            </InputWrapper>
        )}
    />
);
