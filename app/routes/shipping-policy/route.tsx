import type { MetaFunction } from '@remix-run/react';

export default function ShippingPolicyPage() {
    return (
        <>
        <div className="h-discoNavHeight  "></div>
        <div className="text-left px-5 leading-relaxed my-discoPadding" data-oid="kuyn18a">
        <h2 className="heading3 leading-loose py-5">Shipping Policy</h2>

        <h3 className="text-xl font-semibold py-3">1. Shipping Provider</h3>
        <p>
          All orders are shipped exclusively with <strong>Österreichische Post AG (Austrian Post)</strong>.
          <br />
          By placing an order, you agree to the shipping terms and delivery conditions of Österreichische Post AG, which can be found at:
          <br />
          <a rel="noopener" target="_blank" href="https://www.post.at">https://www.post.at</a>
        </p>

        <h3 className="text-xl font-semibold py-3">2. Shipping Area</h3>
        <p>
        We deliver to countries within the <strong>European Union only</strong>. Orders with delivery addresses outside the EU cannot be processed.
        </p>

        <h3 className="text-xl font-semibold py-3">3. Shipping Costs</h3>
        <p>
          Shipping costs are calculated automatically at checkout based on the size, weight, and destination of your order.
          <br />
          Rates are based on the current price tables provided by Austrian Post and include applicable taxes and fees where legally required.
        </p>

        <h3 className="text-xl font-semibold py-3">4. Delivery Times</h3>
        <p>Estimated delivery times:</p>
        <ul data-start="1169" data-end="1254"> {/* data-* attributes retained as list structure is unchanged */}
          <li data-start="1169" data-end="1206">
            <p data-start="1171" data-end="1206">Within Austria: 2–4 business days</p>
          </li>
          <li data-start="1207" data-end="1254">
            <p data-start="1209" data-end="1254">Other EU countries: approx. 3–7 business days</p>
          </li>
        </ul>
        <p>
          These are <strong>non-binding estimates</strong>. Delays may occur due to postal volume, customs clearance (in border-adjacent zones), or local disruptions.
        </p>

        <h3 className="text-xl font-semibold py-3">5. Tracking</h3>
        <p>
          Depending on the selected shipping method, tracking may be available via the Österreichische Post tracking portal:
          <br />
          <a rel="noopener" target="_blank" href="https://www.post.at/sendungsverfolgung">https://www.post.at/sendungsverfolgung</a>
        </p>

        <h3 className="text-xl font-semibold py-3">6. Risk and Liability</h3>
        <p>
          Once your parcel has been handed over to the Austrian Post, <strong>risk and liability are transferred</strong> to the carrier.
          <br />
          We are <strong>not liable for delays, loss, or damage in transit</strong>, unless required by law.
          <br />
          Shipping insurance and delivery confirmation are available as <strong>optional services</strong> (e.g., registered mail or insured packages) during checkout, where applicable.
        </p>

        <h3 className="text-xl font-semibold py-3">7. Undeliverable Parcels</h3>
        <p>
        If a parcel is returned to us due to incorrect address details, failure to collect, or refusal of delivery, we will contact you. Re-shipping is possible at your expense.
        </p>

        <h3 className="text-xl font-semibold py-3">8. Questions</h3>
        <p>
          For shipping-related questions, please contact us at:
          <br />
          {/* TODO: Replace placeholder with actual email */}
          📧 [Insert your email]
          <br />
          {/* TODO: Replace placeholder with actual phone number */}
          📞 [Insert your phone number]
        </p>

        </div>
        </>
    );
}


export const meta: MetaFunction = () => {
    return [
        { title: 'Shipping Policy | DiscoBabes' },
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
