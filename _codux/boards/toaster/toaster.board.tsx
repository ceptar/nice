import { createBoard } from '@wixc3/react-board';
import { toast } from '~/src/components/toast/toast';
import { Toaster } from '~/src/components/toaster/toaster';

import styles from './toaster.board.module.scss';

export default createBoard({
    name: 'Toaster',
    Board: () => {
        return (
            <div className={styles.container} data-oid="ys8b4de">
                <Toaster data-oid="ecahrn6" />
                <button className="button" onClick={() => toast('Info')} data-oid="88qu8ab">
                    Open info toast
                </button>
                <button
                    className="button"
                    onClick={() => toast.success('Success')}
                    data-oid="9og1wb1"
                >
                    Open success toast
                </button>
                <button className="button" onClick={() => toast.error('Error')} data-oid="c19.eay">
                    Open error toast
                </button>
                <button
                    className="button"
                    onClick={() => toast.loading('Loading...', { duration: 2000 })}
                    data-oid="wf0i21u"
                >
                    Open loading toast
                </button>
            </div>
        );
    },
    environmentProps: {
        windowHeight: 300,
        windowWidth: 1100,
    },
});
