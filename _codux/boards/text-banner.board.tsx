import { createBoard } from '@wixc3/react-board';
import { LabelWithArrow } from '~/src/components/label-with-arrow/label-with-arrow';

export default createBoard({
    name: 'Text Banner',
    Board: () => (
        <div className="textBannerSection" data-oid="im1sjxc">
            <div className="textBanner" data-oid="353m40t">
                <div className="textBannerSubtitle" data-oid="s_dhw-s">
                    Products of the highest standards
                </div>
                <div className="textBannerTitle" data-oid="3k3htz_">
                    Essential home collections for sustainable living
                </div>
                <a href="about:blank" data-oid="ro-53o:">
                    <LabelWithArrow data-oid="31u0_b4">Shop Collections</LabelWithArrow>
                </a>
            </div>
        </div>
    ),

    environmentProps: {
        windowWidth: 600,
        windowHeight: 260,
    },
});
