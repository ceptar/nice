import { createBoard, Variant } from '@wixc3/react-board';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { LabelWithArrow } from '~/src/components/label-with-arrow/label-with-arrow';
import ComponentWrapper from '_codux/board-wrappers/component-wrapper';
import { BackgroundParallax, FloatIn } from '~/src/components/visual-effects';
import { FeaturedProductsSection } from '~/src/components/featured-products-section/featured-products-section';
import { Kit } from '../ui-kit-utils/kit';

import styles from './sections.board.module.scss';

export default createBoard({
    name: 'Sections',
    Board: () => (
        <ComponentWrapper data-oid="5s2324_">
            <Kit
                category="Core Components"
                title="Sections"
                className={styles.container}
                data-oid="7hz0_nn"
            >
                <Kit.Section data-oid=":3nsqya">
                    <Kit.Item data-oid="-9_:q1c">
                        <Variant name="Hero Banner" data-oid="_8crv26">
                            <div className="heroBanner" data-oid="xpayy.1">
                                <img
                                    src="https://static.wixstatic.com/media/32aab9_2c3c65e142434906992aedb17db53566~mv2.jpg"
                                    className="heroBannerImage"
                                    alt=""
                                    data-oid=".d:pic6"
                                />

                                <div className="heroBannerOverlay" data-oid="e7_hvhp">
                                    <div className="heroBannerSubtitle" data-oid="sgqawmr">
                                        ReClaim
                                    </div>
                                    <h1 className="heroBannerTitle" data-oid="9dd6slm">
                                        Reuse. Repurpose. Relove.
                                    </h1>
                                    <CategoryLink categorySlug="aa-all" data-oid=".yfmtdw">
                                        <LabelWithArrow data-oid="lqdsv27">
                                            Shop Collections
                                        </LabelWithArrow>
                                    </CategoryLink>
                                </div>
                            </div>
                        </Variant>
                        <Kit.Description data-oid="q8ovu1m">Hero Banner</Kit.Description>
                    </Kit.Item>

                    <Kit.Item data-oid="rzni68c">
                        <Variant name="Promotional" data-oid="5r2pd:o">
                            <BackgroundParallax
                                className="floatingCardBackground"
                                backgroundImageUrl="https://static.wixstatic.com/media/c837a6_cae4dbe5a7ee4637b7d55d9bd5bd755d~mv2.png/v1/fill/w_1178,h_974,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/c837a6_cae4dbe5a7ee4637b7d55d9bd5bd755d~mv2.png"
                                parallaxStrength={0.75}
                                data-oid="bqijpc2"
                            >
                                <FloatIn
                                    direction="up"
                                    duration={1.2}
                                    distance={120}
                                    data-oid="ncsnuae"
                                >
                                    <div className="floatingCard" data-oid="_wbwv0y">
                                        <div className="floatingCardHeader" data-oid="higkqe3">
                                            Happy Holidays
                                        </div>
                                        <div className="floatingCardContent" data-oid=".wf08xu">
                                            <h2 className="floatingCardTitle" data-oid="x9vvpmj">
                                                The holiday
                                            </h2>
                                            <div
                                                className="floatingCardDescription"
                                                data-oid="6-m3m8c"
                                            >
                                                Home essentials for
                                                <br data-oid="59i8gpy" /> sustainable living
                                            </div>
                                        </div>
                                        <CategoryLink
                                            categorySlug="aa-all"
                                            data-oid=".-s7uoz"
                                        >
                                            <LabelWithArrow data-oid="p0b-eu1">
                                                Buy a gift
                                            </LabelWithArrow>
                                        </CategoryLink>
                                    </div>
                                </FloatIn>
                            </BackgroundParallax>
                        </Variant>
                        <Kit.Description data-oid="iaw-eyr">Promotional</Kit.Description>
                    </Kit.Item>

                    <Kit.Item data-oid="4vop5_6">
                        <Variant name="Featured Products" data-oid="nuk1ryu">
                            <FeaturedProductsSection
                                categorySlug="new-in"
                                title="New In"
                                description="Embrace a sustainable lifestyle with our newest drop-ins."
                                data-oid="q_:y8au"
                            />
                        </Variant>
                        <Kit.Description data-oid="5-in6y4">Featured Products</Kit.Description>
                    </Kit.Item>
                </Kit.Section>
            </Kit>
        </ComponentWrapper>
    ),

    environmentProps: {
        windowWidth: 1070,
        windowHeight: 1800,
    },
    isSnippet: true,
});
