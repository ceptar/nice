import { useState } from 'react';
import { createBoard } from '@wixc3/react-board';
import { Dialog, DialogTitle, DialogDescription } from '~/src/components/dialog/dialog';

import styles from './dialog.board.module.scss';

export default createBoard({
    name: 'Dialog',
    Board: () => {
        const [open, setOpen] = useState(true);

        return (
            <div className={styles.container} data-oid="kd0:4nf">
                <button
                    className="button primaryButton"
                    onClick={() => setOpen(true)}
                    data-oid="c0thskl"
                >
                    Open Dialog
                </button>

                <Dialog open={open} onOpenChange={(open) => setOpen(open)} data-oid="zqniov6">
                    <DialogTitle data-oid="56fwed3">Dialog Title</DialogTitle>
                    <DialogDescription data-oid="ql_0ov.">Dialog description</DialogDescription>
                    <div className={styles.dialogContent} data-oid="0znx63d">
                        <button
                            className="button secondaryButton"
                            onClick={() => setOpen(false)}
                            data-oid="rc6stn3"
                        >
                            Close Dialog
                        </button>
                        <button
                            className="button primaryButton"
                            onClick={() => setOpen(true)}
                            data-oid="7no2.ky"
                        >
                            Primary Action
                        </button>
                    </div>
                </Dialog>
            </div>
        );
    },
    environmentProps: {
        windowWidth: 736,
        windowHeight: 528,
    },
});
