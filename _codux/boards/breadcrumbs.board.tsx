import { createBoard } from '@wixc3/react-board';
import { Breadcrumbs } from '~/src/components/breadcrumbs/breadcrumbs';
import ComponentWrapper from '../board-wrappers/component-wrapper';
import styles from './breadcrumbs.board.module.scss';

export default createBoard({
    name: 'Breadcrumbs',
    Board: () => (
        <ComponentWrapper data-oid="08z9hdy">
            <div className={styles.container} data-oid="w.f9fyj">
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            title: 'Home',
                            to: '/',
                        },
                        {
                            title: 'All Products',
                            to: '/products/aa-all',
                        },
                        {
                            title: 'Lemongrass Natural Soap',
                            to: '/product-details/lemongrass-natural-soap',
                        },
                    ]}
                    data-oid="dqulcj-"
                />
            </div>
        </ComponentWrapper>
    ),

    environmentProps: {
        windowWidth: 400,
        windowHeight: 100,
    },
});
