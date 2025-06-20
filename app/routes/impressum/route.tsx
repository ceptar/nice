import { MetaFunction } from '@remix-run/react';

export default function ImpressumPage() {
    return (
        <>
        <div className="h-discoNavHeight  "></div>
        <div className="text-left px-5 leading-relaxed my-discoPadding" data-oid="kuyn18a">
        <h2 className="heading3 leading-loose py-5">Impressum (Legal Disclosure)</h2>
        <p data-start="2580" data-end="2649">
            <strong data-start="2580" data-end="2649">Legal Disclosure according to § 5 ECG, § 14 UGB, and § 24 MedienG</strong>
        </p>
        <p data-start="2651" data-end="3062">
            <strong data-start="2651" data-end="2669">Business Name:</strong> DiscoBabes
            <br data-start="2696" data-end="2699" />
            <strong data-start="2699" data-end="2715">Legal Owner:</strong> Vanyen Cerjan
            <br data-start="2729" data-end="2732" />
            <strong data-start="2732" data-end="2750">Date of Birth:</strong> 24.05.1986
            <br data-start="2761" data-end="2764" />
            <strong data-start="2764" data-end="2785">Business Address:</strong> 1150 Wien, Austria
            <br data-start="2804" data-end="2807" />
            <strong data-start="2807" data-end="2817">Phone:</strong>
            <br data-start="2839" data-end="2842" />
            <strong data-start="2842" data-end="2852">Email:</strong> rufzeichen@discobabes.store
            <br data-start="2875" data-end="2878" />
            <strong data-start="2878" data-end="2890">Website:</strong> discobabes.store
            <br data-start="2916" data-end="2919" />
            <strong data-start="2919" data-end="2935">GISA Number:</strong> 37882310
            <br data-start="2944" data-end="2947" />
            <strong data-start="2947" data-end="2974">VAT ID (if applicable):</strong> VAT Excemption (prices are therefore always gross, including VAT
            <br data-start="3000" data-end="3003" />
            <strong data-start="3003" data-end="3027">Responsible Chamber:</strong> WKO (Wirtschaftskammer Österreich)
        </p>
        </div>
       </>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Impressum | DiscoBabes' },
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
