import { zodResolver } from '@hookform/resolvers/zod';
import { ReportProblemRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { DeepPartial, useForm } from 'react-hook-form';
import z from 'zod';
import { ALERT_TYPE, Alert } from '../../Alert';
import { Button } from '../../Button';
import { CenteredContainer } from '../../Containers';
import { H1, H2 } from '../../Typography/Headers';
import { getFormInput } from './getFormInput';
import { FormConfig } from './types';

export function ConfigForm<FormSchema extends z.ZodTypeAny>({
    config,
    defaultValues,
    validationMode = 'onChange',
    title,
    subTitle,
    submitButtonText = 'Submit',
    onSubmit,
    formSchema,
    errorMessage,
    clearErrorMessage,
    sx,
}: {
    title: ReactNode;
    subTitle?: ReactNode;
    formSchema: FormSchema;
    config: FormConfig;
    defaultValues?: DeepPartial<FormSchema>;
    submitButtonText?: string;
    errorMessage?: string;
    clearErrorMessage?: () => void;
    validationMode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
    onSubmit: (data: FormSchema) => void;
    sx?: SxProps<Theme>;
}) {
    const form = useForm<z.infer<FormSchema>>({
        mode: 'onChange' ?? validationMode,
        ...(defaultValues && { defaultValues }),
        resolver: zodResolver(formSchema),
    });

    const {
        watch,
        formState: { isValid },
        handleSubmit,
    } = form;
    // There is a problem with validation where this watch is needed to trigger validation
    watch();
    return (
        <Form sx={sx}>
            <Header>{title}</Header>
            {subTitle && <p>{subTitle}</p>}

            {config.sections.map((formSection, i) => (
                <FormSection key={`section-${i}`}>
                    {formSection.title && (
                        <Box width="100%">
                            {typeof formSection.title === 'string' ? (
                                <SectionTitle>{formSection.title}</SectionTitle>
                            ) : (
                                formSection.title
                            )}
                        </Box>
                    )}
                    {formSection.fields.map((field, i) => {
                        return (
                            <FieldContainer
                                className={
                                    field.fullWidth ? undefined : 'collapsed'
                                }
                                fullWidth={field.fullWidth}
                                key={`field-${i}`}
                            >
                                {getFormInput({
                                    field,
                                    useFormProps: form,
                                })}
                            </FieldContainer>
                        );
                    })}
                </FormSection>
            ))}
            {errorMessage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Alert
                        icon={
                            <CenteredContainer>
                                <ReportProblemRounded />
                            </CenteredContainer>
                        }
                        type={ALERT_TYPE.ERROR}
                        title={errorMessage}
                        onClose={clearErrorMessage}
                    />
                </motion.div>
            )}
            <Button
                disabled={!isValid}
                onClick={handleSubmit((values) => onSubmit(values))}
            >
                {submitButtonText}
            </Button>
        </Form>
    );
}

const Form = styled('form')(({ theme }) => ({
    width: '100%',
}));

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
}));

const SectionTitle = styled(H2)(({ theme }) => ({
    ...theme.typography.body2,
    fontWeight: 600,
}));

const FormSection = styled('section')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(4),
    '& > *': {
        marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}));

const FieldContainer = styled(Box, {
    shouldForwardProp: (prop) => 'fullWidth' !== prop,
})<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
    width: '100%',
    display: 'inline-block',
    [theme.breakpoints.up('md')]: {
        width: fullWidth ? '100%' : `calc(50% - ${theme.spacing(2)})`,
        '&:nth-of-type(odd).collapsed': {
            marginLeft: theme.spacing(4),
        },
    },
}));
