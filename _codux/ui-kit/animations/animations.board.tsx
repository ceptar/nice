import { createBoard, Variant } from '@wixc3/react-board';
import { BackgroundParallax } from '~/src/components/visual-effects/background-parallax';
import { FadeIn } from '~/src/components/visual-effects/fade-in';
import { FloatIn } from '~/src/components/visual-effects/float-in';
import { Reveal } from '~/src/components/visual-effects/reveal';

import styles from './animations.board.module.scss';

export default createBoard({
    name: 'Animations',
    Board: () => (
        <div className={styles.root} data-oid="hg3xurc">
            <BackgroundParallax
                className={styles.contrastColor}
                backgroundImageUrl="https://static.wixstatic.com/media/c837a6_a2f541f9274546a9b4b0a8dbd2cfa3e0~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,enc_auto/11062b_4ba7b420d917404092175a564fa1358b~mv2-1_edited_edited.jpg"
                parallaxStrength={0.75}
                data-oid="wpqv:v8"
            >
                <h4 className="heading4" data-oid="48hyl1q">
                    Parallax
                </h4>
            </BackgroundParallax>

            <section data-oid="sg9y-:l">
                <h4 className="heading4" data-oid="zlq4321">
                    Reveal
                </h4>
                <Variant name="Animation: Reveal" data-oid="09.jeh3">
                    <Reveal direction="down" duration={3} data-oid="q3::ofe">
                        <img
                            src="https://static.wixstatic.com/media/c837a6_a2f541f9274546a9b4b0a8dbd2cfa3e0~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,enc_auto/11062b_4ba7b420d917404092175a564fa1358b~mv2-1_edited_edited.jpg"
                            alt=""
                            data-oid="520hqys"
                        />
                    </Reveal>
                </Variant>
            </section>

            <section data-oid="9yqbrne">
                <h4 className="heading4" data-oid="nu01xoc">
                    Float In
                </h4>
                <Variant name="Animation: Float In" data-oid="jtspdr6">
                    <FloatIn direction="up" duration={3} distance={120} data-oid="qcu3vh9">
                        <img
                            src="https://static.wixstatic.com/media/c837a6_a2f541f9274546a9b4b0a8dbd2cfa3e0~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,enc_auto/11062b_4ba7b420d917404092175a564fa1358b~mv2-1_edited_edited.jpg"
                            alt=""
                            data-oid="vzevahd"
                        />
                    </FloatIn>
                </Variant>
            </section>

            <section data-oid="h9vggn0">
                <h4 className="heading4" data-oid="bpfkpx.">
                    Fade In
                </h4>
                <Variant name="Animation:Fade In" data-oid=".f:h747">
                    <FadeIn duration={3} data-oid="y2:1k4l">
                        <img
                            src="https://static.wixstatic.com/media/c837a6_a2f541f9274546a9b4b0a8dbd2cfa3e0~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,enc_auto/11062b_4ba7b420d917404092175a564fa1358b~mv2-1_edited_edited.jpg"
                            alt=""
                            data-oid="rcf_b3m"
                        />
                    </FadeIn>
                </Variant>
            </section>
        </div>
    ),

    environmentProps: {
        windowWidth: 400,
        windowHeight: 400,
    },
    isSnippet: true,
});
