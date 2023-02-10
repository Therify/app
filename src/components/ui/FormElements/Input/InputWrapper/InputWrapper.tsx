import { ReactNode } from 'react';
import {
    FormControl,
    InputLabel as MuiInputLabel,
    InputLabelProps,
    Box,
} from '@mui/material';
import { styled, useTheme, SxProps, Theme } from '@mui/material/styles';
import { Caption, CAPTION_SIZE } from '../../../Typography';

export interface InputWrapperProps {
    errorMessage?: string;
    successMessage?: string;
    helperText?: string;
    id?: string;
    label?: string;
    fullWidth?: boolean;
    required?: boolean;
    sx?: SxProps<Theme>;
    children: ReactNode;
    variant?: 'default' | 'white';
}

export const TEST_IDS = {
    INPUT: 'input',
    LABEL: 'label',
    HELPER_TEXT: 'helper-text',
};

export const InputWrapper = ({
    errorMessage,
    successMessage,
    helperText,
    label,
    fullWidth,
    required,
    sx,
    id,
    variant = 'default',
    children,
}: InputWrapperProps) => {
    const theme = useTheme();
    const errorColor = errorMessage ? theme.palette.error.main : undefined;
    const successColor = successMessage
        ? theme.palette.success.main
        : undefined;
    return (
        <FormControl
            variant="standard"
            fullWidth={fullWidth}
            sx={{ marginBottom: theme.spacing(4), ...sx }}
        >
            {label && (
                <InputLabel
                    data-testid={TEST_IDS.LABEL}
                    id={id}
                    required={required}
                >
                    {label}
                </InputLabel>
            )}
            <StyledInputWrapper
                isError={!!errorMessage}
                isSuccess={!!successMessage}
                whiteBg={variant === 'white'}
            >
                {children}
            </StyledInputWrapper>

            {(errorMessage || successMessage || helperText) && (
                <Caption
                    data-testid={TEST_IDS.HELPER_TEXT}
                    size={CAPTION_SIZE.SMALL}
                    style={{
                        marginTop: theme.spacing(3),
                        color:
                            errorColor ??
                            successColor ??
                            theme.palette.grey[500],
                    }}
                >
                    {errorMessage ?? successMessage ?? helperText}
                </Caption>
            )}
        </FormControl>
    );
};
export const InputLabel = ({
    id,
    children,
    required,
    shrink = true,
    ...props
}: {
    id?: string;
    children: ReactNode;
    required?: boolean;
} & InputLabelProps) => {
    const theme = useTheme();
    return (
        <MuiInputLabel
            {...props}
            data-testid={TEST_IDS.LABEL}
            htmlFor={id}
            shrink={shrink}
            style={{
                fontSize: theme.typography.caption.fontSize,
                position: 'relative',
                color: theme.palette.grey[600],
                transform: 'none',
                marginBottom: theme.spacing(4),
            }}
        >
            {children}{' '}
            {required && (
                <span style={{ color: theme.palette.error.main }}>*</span>
            )}
        </MuiInputLabel>
    );
};

const StyledInputWrapper = styled(Box, {
    shouldForwardProp: (prop) =>
        'isSuccess' !== prop && 'isError' !== prop && 'whiteBg' !== prop,
})<{ isSuccess: boolean; isError: boolean; whiteBg: boolean }>(
    ({ isError, isSuccess, whiteBg, theme }) => {
        const errorColor = isError ? theme.palette.error.main : undefined;
        const successColor = isSuccess ? theme.palette.success.main : undefined;
        return {
            '& label.MuiFormLabel-root': {
                display: 'none',
            },
            '& fieldset legend': {
                display: 'none',
            },
            width: '100%',
        };
    }
);
