import { MetaFunction } from '@remix-run/react';

export default function TermsAndConditionsPage() {
    return (
        <>
        <div className="h-discoNavHeight  "></div>
        <div className="text-left px-5 leading-relaxed my-discoPadding" data-oid="kuyn18a">
        <h2 className="heading3 leading-loose py-5">Terms and Conditions (AGB)</h2>
        <p data-start="312" data-end="526">
            <strong data-start="312" data-end="324">1. Scope</strong>
            <br data-start="324" data-end="327" />These General Terms and Conditions apply to all orders placed through our online shop discobabes.store, located in Austria and shipping exclusively to countries within the European Union.
        </p>
        <p data-start="528" data-end="768">
            <strong data-start="528" data-end="552">2. Contracting Party</strong>
            <br data-start="552" data-end="555" />The purchase contract is concluded with:
            <br data-start="595" data-end="598" />
            <strong data-start="598" data-end="628">DiscoBabes – Vanyen Cerjan</strong>
            <br data-start="628" data-end="631" />GISA No: 37882310
            <br data-start="648" data-end="651" />Registered Business Address: 1150 Vienna, Austria
            <br data-start="700" data-end="703" />Email: rufzeichen@discobabes.store
            <br data-start="737" data-end="740" />Phone:
        </p>
        <p data-start="770" data-end="991">
            <strong data-start="770" data-end="799">3. Conclusion of Contract</strong>
            <br data-start="799" data-end="802" />When you place an order in our online shop, you are submitting a legally binding offer to purchase the items in your cart. The contract becomes binding when we confirm your order via email.
        </p>
        <p data-start="993" data-end="1246">
            <strong data-start="993" data-end="1018">4. Prices and Payment</strong>
            <br data-start="1018" data-end="1021" />All prices are shown in Euro (€), including VAT where applicable. Shipping fees are based on Austrian Post rates and are calculated at checkout once the delivery address is provided. We accept the following payment methods:
        </p>
        <ul data-start="1247" data-end="1310">
            <li data-start="1247" data-end="1268">
                <p data-start="1249" data-end="1268">Credit/debit card</p>
            </li>
            <li data-start="1269" data-end="1279">
                <p data-start="1271" data-end="1279">PayPal</p>
            </li>
            <li data-start="1280" data-end="1310">
                <p data-start="1282" data-end="1310">from Payment Provider: stripe.com</p>
            </li>
        </ul>
        <p data-start="1312" data-end="1691">
            <strong data-start="1312" data-end="1338">5. Delivery Conditions</strong>
            <br data-start="1338" data-end="1341" />We deliver exclusively to addresses within the European Union using Österreichische Post AG (Austrian Post). Shipping charges vary based on the size, weight, and destination of your order and will be calculated dynamically at checkout.
            <br data-start="1576" data-end="1579" />Delivery time is typically between 2–4 business days within Austria and 3–7 business days to other EU countries.
        </p>
        <p data-start="1693" data-end="1784">
            <strong data-start="1693" data-end="1718">6. Retention of Title</strong>
            <br data-start="1718" data-end="1721" />Goods remain our property until full payment has been received.
        </p>
        <p data-start="1786" data-end="2092">
            <strong data-start="1786" data-end="1815">7. Warranty and Liability</strong>
            <br data-start="1815" data-end="1818" />The statutory warranty rights of the buyer apply. We are only liable for damage resulting from intent, gross negligence, or injury to life, body, or health. In cases of minor negligence, our liability is limited to foreseeable damages typically arising in such transactions.
        </p>
        <p data-start="2094" data-end="2387">
            <strong data-start="2094" data-end="2120">8. Right of Withdrawal</strong>
            <br data-start="2120" data-end="2123" />Consumers in the EU have a 14-day legal right of withdrawal. However, <strong data-start="2193" data-end="2342">products which are worn in or through the ear (e.g., earrings, pins, or rings) are excluded from return for hygiene and health protection reasons</strong>, unless they are faulty or not as described.
        </p>
        <p data-start="2389" data-end="2534">
            <strong data-start="2389" data-end="2409">9. Governing Law</strong>
            <br data-start="2409" data-end="2412" />These terms are governed by Austrian law, excluding the UN Sales Convention. The place of jurisdiction is Vienna, Austria.
        </p>
        </div>
       </>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Terms and Conditions | DiscoBabes' },
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
