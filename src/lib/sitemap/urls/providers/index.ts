import { ACCOUNT_LINKS } from './account';
import { COACH_PATHS } from './coaches';
import { ONBOARDING_PATHS } from './onboarding';
import { THERAPIST_PATHS } from './therapists';

export const PROVIDERS_PATHS = {
    COACH: COACH_PATHS,
    THERAPIST: THERAPIST_PATHS,
    ONBOARDING: ONBOARDING_PATHS,
    ACCOUNT: ACCOUNT_LINKS,
} as const;