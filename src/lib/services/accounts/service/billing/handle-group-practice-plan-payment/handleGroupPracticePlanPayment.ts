import { HandleGroupPracticePlanPayment } from '@/lib/features/accounts/billing';
import { TransactionV1 } from '@/lib/utils/transaction';
import { AccountsServiceParams } from '../../params';
import {
    GetTherifyIdentifiers,
    handleGroupPracticePlanPaymentTransactionDefinition,
    CreatePlanEntity,
    CreateInvoiceEntity,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) =>
    async (params: HandleGroupPracticePlanPayment.Input) => {
        return await TransactionV1.executeTransaction(
            handleGroupPracticePlanPaymentTransactionDefinition,
            { ...context },
            {
                getTherifyIdentifiers: GetTherifyIdentifiers.factory(params),
                createPlanEntity: CreatePlanEntity.factory(params),
                createInvoiceEntity: CreateInvoiceEntity.factory(params),
            },
            true
        );
    };
