import { handleCallback, CallbackHandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callback(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await handleCallback(req, res);
        res.end();
    } catch (error) {
        if (error instanceof CallbackHandlerError) {
            console.error(error);
            res.status(error.status ?? 400).end(error.message);
            return;
        }
        res.status(500).end(
            (error as { message: string }).message ??
                'An unknown callback error occurred.'
        );
    }
}
