import * as z from 'zod';
import * as State from './state';
import * as Pronoun from './pronoun';
import { ProviderProfileSchema } from '../schema';

export const schema = ProviderProfileSchema.extend({
    licensedStates: State.schema.array(),
    pronouns: Pronoun.schema,
    practiceName: z.string(),
    givenName: z.string(),
    surname: z.string(),
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type ProviderProfile = z.infer<typeof schema>;

export const validate = (value: unknown): ProviderProfile => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is ProviderProfile => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};