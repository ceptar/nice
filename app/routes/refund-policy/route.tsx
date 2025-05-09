import type { MetaFunction } from '@remix-run/react';

export default function RefundPolicyPage() {
    return (
        <div className="textPage" data-oid="5rw-yvw">
            <h1 data-oid="nehy:rl">Refund Policy</h1>

            <h2 data-oid="g1a5z9d">A Legal Disclaimer</h2>
            <div data-oid="0.3m42c">
                The explanations and information provided on this page are only general and
                high-level explanations and information on how to write your own document of a
                Refund Policy. You should not rely on this article as legal advice or as
                recommendations regarding what you should actually do, because we cannot know in
                advance what are the specific refund policies that you wish to establish between
                your business and your customers. We recommend that you seek legal advice to help
                you understand and to assist you in the creation of your own Refund Policy.
            </div>

            <h2 data-oid="n5jb8f2">Refund Policy - The Basics</h2>
            <div data-oid="4gqin6w">
                Having said that, a Refund Policy is a legally binding document that is meant to
                establish the legal relations between you and your customers regarding how and if
                you will provide them with a refund. Online businesses selling products are
                sometimes required (depending on local laws and regulations) to present their
                product return policy and refund policy. In some jurisdictions, this is needed in
                order to comply with consumer protection laws. It may also help you avoid legal
                claims from customers that are not satisfied with the products they purchased.
            </div>

            <h2 data-oid="lmt8at1">What To Include in the Refund Policy</h2>
            <div data-oid="_tep6il">
                Generally speaking, a Refund Policy often addresses these types of issues: the
                timeframe for asking for a refund; will the refund be full or partial; under which
                conditions will the customer receive a refund; and much, much more.
            </div>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Refund Policy | ReClaim' },
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
