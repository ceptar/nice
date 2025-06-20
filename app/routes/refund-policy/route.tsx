import type { MetaFunction } from '@remix-run/react';

export default function RefundPolicyPage() {
    return (
          <>
        <div className="h-discoNavHeight  "></div>
        <div className="text-left px-5 leading-relaxed my-discoPadding" data-oid="kuyn18a">
        <h2 className="heading3 leading-loose py-5">Return & Withdrawal Policy</h2>
        <p data-start="3106" data-end="3323">
            <strong data-start="3106" data-end="3129">Right of Withdrawal</strong>
            <br data-start="3129" data-end="3132" />You have the right to withdraw from your purchase within 14 days without giving any reason. The withdrawal period is 14 days from the day you or a third party named by you receives the goods.
        </p>
        <p data-start="3325" data-end="3437">To exercise your right of withdrawal, please contact us using the contact information provided in the Impressum.</p>
        <p data-start="3439" data-end="3715">
            <strong data-start="3439" data-end="3469">Exceptions from Withdrawal</strong>
            <br data-start="3469" data-end="3472" />Due to <strong data-start="3479" data-end="3520">health protection and hygiene reasons</strong>, <strong data-start="3522" data-end="3643">we cannot accept returns of products that are worn directly in or through body parts (e.g., earrings, studs, or pins)</strong> if the hygiene seal has been broken or the product shows signs of wear.
        </p>
        <p data-start="3717" data-end="3937">
            <strong data-start="3717" data-end="3739">Statutory Warranty</strong>
            <br data-start="3739" data-end="3742" />If your item is defective or does not match the description, your statutory rights apply, and we will provide a replacement, repair, or refund in accordance with Austrian consumer protection law.
        </p>
        <p data-start="3939" data-end="4204">
            <strong data-start="3939" data-end="3958">Return Shipping</strong>
            <br data-start="3958" data-end="3961" />If you withdraw from your contract or return an item that we are not legally required to take back, you are responsible for the cost of return shipping. In case of a justified complaint (e.g., damaged or incorrect item), we will bear the cost.
        </p>
        <p data-start="4206" data-end="4520">
            <strong data-start="4206" data-end="4217">Refunds</strong>
            <br data-start="4217" data-end="4220" />We will refund all payments received from you, excluding delivery charges (unless otherwise required by law), without undue delay and within 14 days of receiving the returned item or your withdrawal notification. Refunds will be issued using the same payment method used for the original transaction.
        </p>
                </div>
       </>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Refund Policy | DiscoBabes' },
        {
            name: 'description',
            content: 'Essential home products for sustainable living',
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
    ];
};
