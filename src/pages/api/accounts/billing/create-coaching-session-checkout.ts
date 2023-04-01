import { NextApiRequest, NextApiResponse } from 'next';
import { AccountsService } from '@/lib/modules/accounts/service';
import { CreateCoachingSessionCheckout } from '@/lib/modules/accounts/features/billing';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CreateCoachingSessionCheckout.Output>
) {
    if (req.method !== 'POST') {
        return res.status(404).end();
    }
    const { memberId, providerId } = JSON.parse(req.body);
    if (typeof memberId !== 'string' || typeof providerId !== 'string') {
        return res
            .status(400)
            .json({ invoiceId: null, errors: ['Missing ids'] });
    }

    try {
        const { invoiceId } =
            await AccountsService.billing.createCoachingSessionCheckout({
                memberId,
                providerId,
            });

        res.status(200).json({ invoiceId, errors: [] });
    } catch (error) {
        let errorMessage =
            'Creating Stripe invoice failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({ invoiceId: null, errors: [errorMessage] });
    }
}