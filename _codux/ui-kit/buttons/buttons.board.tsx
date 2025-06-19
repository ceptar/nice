import { createBoard, Variant } from '@wixc3/react-board';
import { CartIcon, FacebookIcon, PinterestIcon, WhatsAppIcon } from '~/src/components/icons';
import { LabelWithArrow } from '~/src/components/label-with-arrow/label-with-arrow';
import { TrashIcon } from '../../../src/components/icons/trash-icon';
import { LockIcon } from '../../../src/components/icons/lock-icon';
import { ErrorIcon } from '../../../src/components/icons/error-icon';
import { MenuIcon } from '../../../src/components/icons/menu-icon';
import { ChevronRightIcon } from '../../../src/components/icons/chevron-right-icon';
import { ArrowRightIcon } from '../../../src/components/icons/arrow-right-icon';
import { Kit } from '../ui-kit-utils/kit';
import classNames from 'classnames';

import styles from './buttons.board.module.scss';

export default createBoard({
    name: 'Buttons & Icons',
    Board: () => (
        <Kit category="Core Components" title="Buttons & Icons" data-oid="5p.onrz">
            <Kit.Section title="Buttons" className={styles.demoWidth} data-oid="chcdgri">
                <Kit.Item data-oid="o4n1fxv">
                    <Variant name="Primary Button" data-oid="ma:5bre">
                        <button className="button primaryButton" data-oid="3t:pzwy">
                            Add to Cart
                        </button>
                    </Variant>
                    <Kit.Description data-oid="2y742sx">Primary Button</Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid=".866pql">
                    <Variant name="Primary Muted Button" data-oid="ldrquso">
                        <button className="button mutedPrimaryButton" data-oid="b4w5x7b">
                            Add to Cart
                        </button>
                    </Variant>
                    <Kit.Description data-oid="teyz5nl">Primary Muted Button</Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid="g0ipbj8">
                    <Variant name="Secondary Button" data-oid="e1-zrs3">
                        <button className="button" data-oid="lzbijot">
                            Add to Cart
                        </button>
                    </Variant>
                    <Kit.Description data-oid="qx842nn">Secondary Button</Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid="_itdsjo">
                    <Variant name="Label With Arrow" data-oid="sab:ux.">
                        <LabelWithArrow data-oid="__5bg4g">Shop Now</LabelWithArrow>
                    </Variant>
                    <Kit.Description data-oid="gpetewx">Label With Arrow</Kit.Description>
                </Kit.Item>
            </Kit.Section>

            <Kit.Section title="Icons" data-oid="pdxv:wm">
                <div className={styles.itemsGroup} data-oid="c2onrd8">
                    <Kit.Item data-oid="6.jarmm">
                        <div className={styles.icon} data-oid="-:ktepp">
                            <Variant name="Cart Icon" data-oid="kshnb_n">
                                <CartIcon count={3} data-oid="65cjdnz" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid=".5lrqmy">Cart</Kit.Description>
                    </Kit.Item>
                    <Kit.Item data-oid="lq248:u">
                        <div className={styles.icon} data-oid="_qny0xx">
                            <Variant name="Trash Icon" data-oid="hqoc.5l">
                                <TrashIcon height={27} data-oid="ij9l38j" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="a6:4k3w">Trash</Kit.Description>
                    </Kit.Item>
                    <Kit.Item data-oid="t2kd7jm">
                        <div className={styles.icon} data-oid="yovuga5">
                            <Variant name="Lock Icon" data-oid="ozj6r0m">
                                <LockIcon height={23} data-oid="rb7s0:a" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="7nxzjie">Lock</Kit.Description>
                    </Kit.Item>
                    <Kit.Item data-oid="1asm177">
                        <div className={styles.icon} data-oid="3ohtu.k">
                            <Variant name="Error Icon" data-oid="71cgdrn">
                                <ErrorIcon height={30} data-oid="ckn7ssv" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="d15tv:o">Error</Kit.Description>
                    </Kit.Item>
                    <Kit.Item data-oid="i7c49rn">
                        <div
                            className={classNames(styles.icon, styles.menuIcon)}
                            data-oid="3z-6jp2"
                        >
                            <Variant name="Menu Icon" data-oid="-fx5ida">
                                <MenuIcon width={24} data-oid="cwbqjoj" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="kp32ym6">Menu</Kit.Description>
                    </Kit.Item>
                    <Kit.Item data-oid="__lj6yk">
                        <div className={styles.icon} data-oid="i_3bio6">
                            <Variant name="Chevron Icon" data-oid="3psoz2s">
                                <ChevronRightIcon width={28} data-oid="recgsww" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="p8ff.fx">Chevron</Kit.Description>
                    </Kit.Item>
                    <Kit.Item data-oid="y11u26s">
                        <div className={styles.icon} data-oid="vic65qo">
                            <Variant name="Arrow Icon" data-oid="jhe3kc0">
                                <ArrowRightIcon height={35} data-oid="915_0n4" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="v45auc4">Arrow</Kit.Description>
                    </Kit.Item>
                </div>
            </Kit.Section>

            <Kit.Section title="Social" data-oid="zdq67.1">
                <div className={styles.itemsGroup} data-oid="c.z7mgx">
                    <Kit.Item data-oid="b61jtag">
                        <div className={styles.icon} data-oid="ma2ghud">
                            <Variant name="WhatsApp" data-oid="7wtk49o">
                                <WhatsAppIcon className="smallIcon" data-oid="l.jkbr_" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="-6iqeez">WhatsApp</Kit.Description>
                    </Kit.Item>
                    <Kit.Item data-oid="j-j2iu5">
                        <div className={styles.icon} data-oid="c8-bu7-">
                            <Variant name="Facebook" data-oid="8rcs6x2">
                                <FacebookIcon className="smallIcon" data-oid="01tzgw8" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="v-5ofvu">Facebook</Kit.Description>
                    </Kit.Item>
                    <Kit.Item data-oid="fovtx2m">
                        <div className={styles.icon} data-oid=".nhmd.s">
                            <Variant name="Pinterest" data-oid="w0-n7pv">
                                <PinterestIcon className="smallIcon" data-oid="dk04whg" />
                            </Variant>
                        </div>
                        <Kit.Description data-oid="xaip55g">Pinterest</Kit.Description>
                    </Kit.Item>
                </div>
            </Kit.Section>
        </Kit>
    ),

    environmentProps: {
        windowWidth: 430,
        windowHeight: 700,
    },
    isSnippet: true,
});
