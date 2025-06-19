import { createBoard, Variant } from '@wixc3/react-board';
import { Accordion } from '~/src/components/accordion/accordion';
import { ProductCard } from '~/src/components/product-card/product-card';
import { QuantityInput } from '~/src/components/quantity-input/quantity-input';
import { Select, SelectItem } from '~/src/components/select/select';
import classNames from 'classnames';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { ColorSelect } from '~/src/components/color-select/color-select';
import ComponentWrapper from '_codux/board-wrappers/component-wrapper';
import { Kit } from '../ui-kit-utils/kit';

import styles from './components.board.module.scss';

export default createBoard({
    name: 'Components & Elements',
    Board: () => (
        <ComponentWrapper data-oid=".j0wt0y">
            <Kit category="Core Components" title="Components & Elements" data-oid="nme5jc9">
                <Kit.Section title="Inputs" data-oid="1h5kamq">
                    <Kit.Item data-oid="jv1wx7v">
                        <Variant name="Input" data-oid="v0ks:.m">
                            <input
                                className="textInput"
                                value="Text input"
                                onChange={() => {}}
                                data-oid="djzcu4o"
                            />
                        </Variant>
                        <Kit.Description data-oid="tkafwf2">Input</Kit.Description>
                    </Kit.Item>

                    <Kit.Item data-oid="fb0p82q">
                        <Variant name="Input Placeholder" data-oid=":n8n0jy">
                            <input
                                className="textInput"
                                placeholder="Placeholder"
                                value=""
                                onChange={() => {}}
                                data-oid="ttd.ih8"
                            />
                        </Variant>
                        <Kit.Description data-oid="3852rjh">Input Placeholder</Kit.Description>
                    </Kit.Item>

                    <Kit.Item data-oid="iasl2pw">
                        <Variant name="Disabled Input" data-oid="2nf1kb4">
                            <input
                                disabled
                                className="textInput"
                                value="Disabled input"
                                onChange={() => {}}
                                data-oid="3uxmwlp"
                            />
                        </Variant>
                        <Kit.Description data-oid="034_qir">Disabled Input</Kit.Description>
                    </Kit.Item>

                    <Kit.Item data-oid="dclp5kd">
                        <Variant name="Number Input" data-oid=".4njqxq">
                            <QuantityInput value={6} onChange={() => {}} data-oid="xigswkr" />
                        </Variant>
                        <Kit.Description data-oid="ph0r-85">Number Input</Kit.Description>
                    </Kit.Item>
                </Kit.Section>

                <Kit.Section title="Selects" className={styles.demoWidth} data-oid="pvbt4h7">
                    <Kit.Item data-oid="58u3:ss">
                        <Variant name="Select" data-oid="7dknz_:">
                            <Select
                                value=""
                                onValueChange={() => {}}
                                placeholder="Select value"
                                data-oid="ll2-odt"
                            >
                                <SelectItem value="option-1" data-oid="vnytvt:">
                                    Option 1
                                </SelectItem>
                                <SelectItem value="option-2" data-oid="7u7fr.q">
                                    Option 2
                                </SelectItem>
                                <SelectItem value="option-3" data-oid="sh65meq">
                                    Option 3
                                </SelectItem>
                            </Select>
                        </Variant>
                        <Kit.Description data-oid="jxgg0bp">Select</Kit.Description>
                    </Kit.Item>

                    <Kit.Item data-oid="6yn1dk_">
                        <Variant name="Color Select" data-oid="c:391kc">
                            <ColorSelect
                                className="colorSelect"
                                selectedId="color2"
                                onChange={() => {}}
                                options={[
                                    { id: 'color1', color: 'white' },
                                    { id: 'color2', color: 'black' },
                                    { id: 'color3', color: '#00a400' },
                                    { id: 'color4', color: 'rgb(214, 122, 127)' },
                                    { id: 'color5', color: 'hsl(30deg 82% 43%)' },
                                ]}
                                data-oid="mgt:va5"
                            />
                        </Variant>
                        <Kit.Description data-oid=".0m0ggl">Color Select</Kit.Description>
                    </Kit.Item>
                </Kit.Section>

                <Kit.Section title="Accordion" data-oid="ailetj9">
                    <Kit.Item className={styles.demoWidth} data-oid="_c054kw">
                        <Variant name="Accordion" data-oid="h7if-tx">
                            <Accordion
                                items={[
                                    {
                                        header: 'Product Info',
                                        content: 'Content',
                                    },
                                    {
                                        header: 'Return & Refund Policy',
                                        content: 'Content',
                                    },
                                    {
                                        header: 'Shipping Info ',
                                        content: 'Content',
                                    },
                                ]}
                                data-oid="la0x._k"
                            />
                        </Variant>
                        <Kit.Description data-oid="xu9gn__">Accordion</Kit.Description>
                    </Kit.Item>
                </Kit.Section>

                <Kit.Section title="Labels" data-oid="0dx5upi">
                    <Kit.Item data-oid="0ormsj4">
                        <Variant name="Ribbon" data-oid="koyzht7">
                            <span className="ribbon" data-oid="6d3v1uk">
                                Sale
                            </span>
                        </Variant>
                        <Kit.Description data-oid="s4iohjs">Ribbon</Kit.Description>
                    </Kit.Item>
                </Kit.Section>

                <Kit.Section title="Cards" data-oid="x:f4t8h">
                    <Kit.Item className={styles.demoWidth} data-oid="77y2c4q">
                        <Variant name="Product Card" data-oid="::m36ik">
                            <ProductCard
                                name="Bamboo Toothbrush"
                                imageUrl="https://static.wixstatic.com/media/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg/v1/fill/w_824,h_1098,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg"
                                ribbon="NEW"
                                price="$6"
                                discountedPrice="$5.5"
                                data-oid="pray:bp"
                            />
                        </Variant>
                        <Kit.Description data-oid="yrnrrlb">Product Card</Kit.Description>
                    </Kit.Item>
                    <Kit.Item
                        className={classNames(styles.demoWidth, styles.linkCardWrapper)}
                        data-oid="o0yi44x"
                    >
                        <Variant name="Link Card" data-oid="l64squq">
                            <CategoryLink
                                categorySlug="aa-all"
                                className="linkCard"
                                data-oid="7q6ns6h"
                            >
                                <img
                                    className="linkCardBackground"
                                    src="https://static.wixstatic.com/media/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg/v1/fill/w_547,h_730,q_90/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg"
                                    alt=""
                                    data-oid="b3qyy6l"
                                />

                                <div className="linkCardTitle" data-oid="ksaxxfy">
                                    All Products
                                </div>
                            </CategoryLink>
                        </Variant>
                        <Kit.Description data-oid="ed43o5c">Link Card</Kit.Description>
                    </Kit.Item>
                </Kit.Section>
            </Kit>
        </ComponentWrapper>
    ),

    environmentProps: {
        windowWidth: 320,
        windowHeight: 800,
    },
    isSnippet: true,
});
