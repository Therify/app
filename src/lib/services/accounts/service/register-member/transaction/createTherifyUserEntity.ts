import { RegisterMemberTransaction, TRANSACTION_STEPS } from './definition';

export const createTherifyUserEntity: RegisterMemberTransaction['CREATE_THERIFY_USER_ENTRY'] =
    {
        async commit(
            input,
            { orm },
            { [TRANSACTION_STEPS.CREATE_AUTH0_USER]: { auth0UserId } }
        ) {
            if (input.registrationCode) {
                const registrationCode =
                    await orm.registrationCode.findUniqueOrThrow({
                        where: { id: input.registrationCode },
                        include: {
                            account: true,
                        },
                    });
                const account = await orm.account.findUniqueOrThrow({
                    where: { id: registrationCode.accountId },
                });
                const newUser = await orm.user.create({
                    data: {
                        emailAddress: input.emailAddress,
                        givenName: input.givenName,
                        surname: input.surname,
                        dateOfBirth: input.dateOfBirth,
                        hasAcceptedTermsAndConditions: true,
                        auth0Id: auth0UserId,
                        accountId: account.id,
                        roles: [input.role],
                        memberProfile: {
                            create: {
                                state: input.state,
                                insurance: input.insurance,
                            },
                        },
                    },
                });
                return {
                    therifyUserId: newUser.id,
                };
            }
            const newUser = await orm.user.create({
                data: {
                    emailAddress: input.emailAddress,
                    givenName: input.givenName,
                    surname: input.surname,
                    dateOfBirth: input.dateOfBirth,
                    hasAcceptedTermsAndConditions: true,
                    auth0Id: auth0UserId,
                    roles: [input.role],
                    memberProfile: {
                        create: {
                            state: input.state,
                            insurance: input.insurance,
                        },
                    },
                },
            });
            return {
                therifyUserId: newUser.id,
            };
        },
        async rollback(
            input,
            { orm },
            { [TRANSACTION_STEPS.CREATE_THERIFY_USER_ENTRY]: { therifyUserId } }
        ) {
            await orm.user.delete({ where: { id: therifyUserId } });
        },
    };