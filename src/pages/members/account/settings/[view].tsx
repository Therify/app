import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
    SettingsPage,
    SETTINGS_TAB_IDS,
} from '@/lib/modules/accounts/components/settings';
import { useFeatureFlags } from '@/lib/shared/hooks';
import { membersService } from '@/lib/modules/members/service';
import { MemberTherifyUserPageProps } from '@/lib/modules/members/service/get-therify-user-props';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getTherifyUserPageProps,
    })
);

export default function ClientDetailsPage({
    user,
}: MemberTherifyUserPageProps) {
    const { flags } = useFeatureFlags(user);
    const router = useRouter();

    useEffect(() => {
        if (flags.didFlagsLoad && !flags.isV3DirectoryEnabled) {
            router.push(URL_PATHS.PROVIDERS.COACH.CLIENTS);
        }
    }, [flags.isV3DirectoryEnabled, flags.didFlagsLoad, router]);

    if (!user || !flags.isV3DirectoryEnabled) return null;
    return (
        <MemberNavigationPage
            currentPath={URL_PATHS.MEMBERS.ACCOUNT.SETTINGS.ROOT}
            user={user}
        >
            <SettingsPage
                user={user}
                currentTab={getSettingsView(router.query.view)}
                onTabChange={(tabId) =>
                    router.push(
                        `${URL_PATHS.MEMBERS.ACCOUNT.SETTINGS.ROOT}/${tabId}`
                    )
                }
            />
        </MemberNavigationPage>
    );
}

const getSettingsView = (view: string | string[] | undefined) => {
    const currentView = Array.isArray(view) ? view[0] : view;
    switch (currentView) {
        case SETTINGS_TAB_IDS.CARE_DETAILS:
            return SETTINGS_TAB_IDS.CARE_DETAILS;
        case SETTINGS_TAB_IDS.BILLING:
            return SETTINGS_TAB_IDS.BILLING;
        case SETTINGS_TAB_IDS.NOTIFICATIONS:
            return SETTINGS_TAB_IDS.NOTIFICATIONS;
        case SETTINGS_TAB_IDS.ACCOUNT:
        default:
            return SETTINGS_TAB_IDS.ACCOUNT;
    }
};
