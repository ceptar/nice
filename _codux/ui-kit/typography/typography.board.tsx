import { createBoard, Variant } from '@wixc3/react-board';
import { Kit } from '../ui-kit-utils/kit';

export default createBoard({
    name: 'Typography',
    Board: () => (
        <Kit category="Foundation" title="Typography" data-oid=":li_a37">
            <Kit.Section title="Heading" data-oid="r9qf:bx">
                <Kit.Item data-oid="vui4nej">
                    <Variant name="Heading1" data-oid="ffmp5jz">
                        <h1 className="heading1" data-oid="uv0smyr">
                            Heading 1
                        </h1>
                    </Variant>
                    <Kit.Description data-oid="cqytq7k">
                        <b data-oid="bo17zfj">--heading1:</b> Marcellus / 80px / 1
                    </Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid="1u36ekd">
                    <Variant name="Heading2" data-oid="up.d_sf">
                        <h2 className="heading2" data-oid="oy.inh_">
                            Heading 2
                        </h2>
                    </Variant>
                    <Kit.Description data-oid="3ka.x40">
                        <b data-oid="_wl0.ev">--heading2:</b> Marcellus / 55px / 1.1
                    </Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid="vip.z-3">
                    <Variant name="Heading3" data-oid="7.kn.v7">
                        <h3 className="heading3" data-oid="tgk4np9">
                            Heading 3
                        </h3>
                    </Variant>
                    <Kit.Description data-oid="y0_z_s5">
                        <b data-oid="0_9zdql">--heading3:</b> Marcellus / 42px / 1.2
                    </Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid="k72w6fc">
                    <Variant name="Heading4" data-oid="i0v2ljy">
                        <h4 className="heading4" data-oid="gs7l30_">
                            Heading 4
                        </h4>
                    </Variant>
                    <Kit.Description data-oid="rz4ians">
                        <b data-oid="d6pb2xz">--heading4:</b> Marcellus / 40px / 1.2
                    </Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid=":l:lcql">
                    <Variant name="Heading5" data-oid="r5ic7r5">
                        <h5 className="heading5" data-oid="yaj7mio">
                            Heading 5
                        </h5>
                    </Variant>
                    <Kit.Description data-oid="i5bfcgw">
                        <b data-oid="7z_se:x">--heading5:</b> Marcellus / 20px / 1.3
                    </Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid="j:gaofi">
                    <Variant name="Heading6" data-oid="vr67w9-">
                        <h6 className="heading6" data-oid="h4hh-:g">
                            Heading 6
                        </h6>
                    </Variant>
                    <Kit.Description data-oid="y2:z6zh">
                        <b data-oid="hcw873b">--heading6:</b> Figtree (400) / 20px / 1.4
                    </Kit.Description>
                </Kit.Item>
            </Kit.Section>

            <Kit.Section title="Paragraph" data-oid="oldwcrq">
                <Kit.Item data-oid="z4jwuf3">
                    <Variant name="Paragraph1" data-oid="f2.u6.c">
                        <div className="paragraph1" data-oid="nu4csfv">
                            We ignite opportunity by setting the world in motion. 0123456789
                        </div>
                    </Variant>
                    <Kit.Description data-oid="bpkcokm">
                        <b data-oid="zk7vkg7">--paragraph1:</b> Figtree (400) / 16px / 1.5
                    </Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid="_kerwrp">
                    <Variant name="Paragraph2" data-oid="wp7n2r_">
                        <div className="paragraph2" data-oid="5:3i5x6">
                            We ignite opportunity by setting the world in motion. 0123456789
                        </div>
                    </Variant>
                    <Kit.Description data-oid="6yqm95.">
                        <b data-oid="on:cgcq">--paragraph2:</b> Figtree (400) / 15px / 1.6
                    </Kit.Description>
                </Kit.Item>
                <Kit.Item data-oid="8.q2g70">
                    <Variant name="Paragraph3" data-oid="eqf3:c0">
                        <div className="paragraph3" data-oid="dan45pb">
                            We ignite opportunity by setting the world in motion. 0123456789
                        </div>
                    </Variant>
                    <Kit.Description data-oid="g-86hdk">
                        <b data-oid="9fhg4jd">--paragraph3:</b> Figtree (400) / 14px / 1.6
                    </Kit.Description>
                </Kit.Item>
            </Kit.Section>
        </Kit>
    ),

    environmentProps: {
        windowWidth: 450,
        windowHeight: 700,
    },
    isSnippet: true,
});
