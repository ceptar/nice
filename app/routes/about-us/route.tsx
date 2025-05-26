import type { MetaFunction } from '@remix-run/react';
import { FadeIn, Reveal } from '~/src/components/visual-effects';
import styles from './route.module.scss';

export default function AboutUsPage() {
    return (
        <div className={styles.root} data-oid="quulke_">
            <Reveal className={styles.aboutSection} direction="up" duration={3} data-oid="ftfz9gr">
                <h1 className={styles.title} data-oid="ke3ql9j">
                    We are ReClaim
                </h1>
                <div className={styles.subtitle} data-oid="6n2spoq">
                    A women-owned local business
                </div>
                <div className={styles.description} data-oid="a89ni_9">
                    This is the space to introduce visitors to the business or brand. Briefly
                    explain who&#39;s behind it, what it does and what makes it unique. Share its
                    core values and what this site has to offer.
                </div>
            </Reveal>
            <FadeIn duration={2} data-oid="wihpk_x">
                <img
                    className={styles.image}
                    src="https://static.wixstatic.com/media/c837a6_825d7dbd2e634114906169b9674b56fa~mv2.jpg"
                    alt=""
                    data-oid="gkz95kg"
                />
            </FadeIn>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'About ReClaim' },
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
