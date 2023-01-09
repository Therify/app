import * as z from 'zod';
import { stripeProductSchema } from '../../../types';

export const schema = z.object({
    object: z.literal('search_result'),
    data: z.array(stripeProductSchema),
});

export type Output = z.infer<typeof schema>;

export const validate = (value: unknown): Output => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Output => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
