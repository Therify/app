import type { AppProps, AppType } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { ApplicationContainer } from '@/components/ui';
import { withTRPC } from '@trpc/next';
import { UserProvider as Auth0UserProvider } from '@auth0/nextjs-auth0/client';
import { AppRouter } from '@/lib/server/routers/app';
import { TherifyUser, FirebaseClient } from '@/lib/context';
import { therifyDesignSystem } from '@/components/themes/therify-design-system';
import { InAppNotificationsContext } from '@/components/features/in-app-notifications/context';
import { Globals } from '@/components/styles';

const App: AppType = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={therifyDesignSystem}>
            <Globals />
            <Auth0UserProvider>
                <TherifyUser.Provider>
                    <FirebaseClient.Provider>
                        <InAppNotificationsContext.Provider>
                            <ApplicationContainer>
                                <Component {...pageProps} />
                            </ApplicationContainer>
                        </InAppNotificationsContext.Provider>
                    </FirebaseClient.Provider>
                </TherifyUser.Provider>
            </Auth0UserProvider>
        </ThemeProvider>
    );
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : 'http://localhost:3000/api/trpc';
        if (typeof window !== 'undefined') {
            // during client requests
            return {
                url: '/api/trpc',
            };
        }

        return {
            url,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: true,
})(App);
