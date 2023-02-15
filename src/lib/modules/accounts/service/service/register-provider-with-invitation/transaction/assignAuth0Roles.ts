import { getNodeEnvironmentConfiguration } from '@/lib/shared/configuration';
import { getRoleByEnvironment, Role } from '@/lib/shared/types/roles';
import { RegisterProviderWithInitationTransaction } from './definition';

export const factory: (
    role: Role
) => RegisterProviderWithInitationTransaction['assignAuth0Roles'] = (role) => {
    return {
        async commit({ auth0 }, { createAuth0User: { auth0UserId } }) {
            await auth0.assignUserRoles({
                userId: auth0UserId,
                roles: [
                    getRoleByEnvironment(
                        role,
                        getNodeEnvironmentConfiguration().NODE_ENV
                    ),
                ],
            });
        },
        rollback() {},
    };
};
