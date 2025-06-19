import type { MetaFunction } from '@remix-run/react';

export default function ShippingPolicyPage() {
    return (
        <div className="textPage" data-oid="rha:o:6">
            <h1 data-oid=":cl807b">Shipping Policy</h1>

            <h2 data-oid="yegyk1s">A Legal Disclaimer</h2>
            <div data-oid="zcs0iti">
                The explanations and information provided on this page are only general and
                high-level explanations and information on how to write your own document of a
                Shipping Policy. You should not rely on this article as legal advice or as
                recommendations regarding what you should actually do, because we cannot know in
                advance what are the specific shipping policies that you wish to establish between
                your business and your customers. We recommend that you seek legal advice to help
                you understand and to assist you in the creation of your own Shipping Policy.
            </div>

            <h2 data-oid="zyh41wc">Shipping Policy - The Basics</h2>
            <div data-oid="_jrd4ug">
                Having said that, a Shipping Policy is a legally binding document that is meant to
                establish the legal relations between you and your customers. It is the legal
                framework for presenting your obligations to your customers, but also to address
                different possible scenarios that may occur, and what happens in each and every
                case.
            </div>
            <div data-oid="l0x2jf.">
                A Shipping Policy is a good practice and it helps both sides - you and your
                customers. Your customers may benefit from being informed about what they can expect
                from your service. You may benefit because people may be likely to shop with you if
                you have a clear Shipping Policy in place since there won’t be any questions about
                your shipping timeframes or processes.
            </div>

            <h2 data-oid="cr_e.ag">What To Include In The Shipping Policy</h2>
            <div data-oid="dg4a9lx">
                Generally speaking, a Shipping Policy often addresses these types of issues: the
                timeframe for processing orders; the shipping costs; different domestic and
                international shipping solutions; potential service interruptions; and much, much
                more.
            </div>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Shipping Policy | ReClaim' },
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
