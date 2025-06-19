import { createBoard } from '@wixc3/react-board';
import { Slider } from '~/src/components/slider/slider';

import styles from './slider.board.module.scss';

export default createBoard({
    name: 'Slider',
    Board: () => (
        <div className={styles.container} data-oid="7n1hc5n">
            <Slider className="slider" defaultValue={[50]} data-oid="p5ytwyw" />
            <Slider className="slider" defaultValue={[50]} disabled data-oid="7x9l415" />
            <Slider className="slider" defaultValue={[33, 66]} data-oid="250vtgs" />
        </div>
    ),

    environmentProps: {
        windowWidth: 340,
        windowHeight: 228,
    },
});
