import type { MetaFunction } from '@remix-run/react';

export default function PrivacyPolicyPage() {
    return (
        <div className="textPage" data-oid="emhukud">
            <h1 data-oid="4n8k08d">Privacy Policy</h1>

            <h2 data-oid="pxy9l4o">A Legal Disclaimer</h2>
            <div data-oid="2vsi189">
                The explanations and information provided on this page are only general and
                high-level explanations and information on how to write your own document of a
                Privacy Policy. You should not rely on this article as legal advice or as
                recommendations regarding what you should actually do, because we cannot know in
                advance what are the specific privacy policies you wish to establish between your
                business and your customers and visitors. We recommend that you seek legal advice to
                help you understand and to assist you in the creation of your own Privacy Policy.
            </div>

            <h2 data-oid="e3-xrp3">Privacy Policy - The Basics</h2>
            <div data-oid=":s3q6.y">
                Having said that, a privacy policy is a statement that discloses some or all of the
                ways a website collects, uses, discloses, processes, and manages the data of its
                visitors and customers. It usually also includes a statement regarding the website’s
                commitment to protecting its visitors’ or customers’ privacy, and an explanation
                about the different mechanisms the website is implementing in order to protect
                privacy.
            </div>
            <div data-oid="ma6p.cr">
                Different jurisdictions have different legal obligations of what must be included in
                a Privacy Policy. You are responsible to make sure you are following the relevant
                legislation to your activities and location.
            </div>

            <h2 data-oid="ol-17ja">What To Include In The Privacy Policy</h2>
            <div data-oid="xgr4y51">
                Generally speaking, a Privacy Policy often addresses these types of issues: the
                types of information the website is collecting and the manner in which it collects
                the data; an explanation about why is the website collecting these types of
                information; what are the website’s practices on sharing the information with third
                parties; ways in which your visitors and customers can exercise their rights
                according to the relevant privacy legislation; the specific practices regarding
                minors’ data collection; and much, much more.
            </div>
            <div data-oid="bxl7rw:">
                To learn more about this, check out our article “
                <a
                    href="https://support.wix.com/en/article/creating-a-privacy-policy"
                    target="_blank"
                    data-oid="hbaywil"
                >
                    Creating a Privacy Policy
                </a>
                ”.
            </div>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Privacy Policy | ReClaim' },
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
