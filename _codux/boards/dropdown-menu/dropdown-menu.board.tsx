import { createBoard } from '@wixc3/react-board';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '~/src/components/dropdown-menu/dropdown-menu';

import styles from './dropdown-menu.board.module.scss';

export default createBoard({
    name: 'Dropdown Menu',
    Board: () => {
        return (
            <div className={styles.container} data-oid="0d2cc43">
                <DropdownMenu
                    trigger={
                        <button className="button primaryButton" data-oid="wx_uexq">
                            Open Dropdown Menu
                        </button>
                    }
                    contentProps={{ align: 'start' }}
                    data-oid="km3n-2m"
                >
                    <DropdownMenuItem data-oid="odsffqn">Menu Item 1</DropdownMenuItem>
                    <DropdownMenuItem data-oid="z0s5vfi">Menu Item 2</DropdownMenuItem>
                    <DropdownMenuItem data-oid="q_w8i6k">
                        Menu Item With A Long Name That Is Going To Be Truncated
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled data-oid="n:.8ihc">
                        Disabled Menu Item
                    </DropdownMenuItem>
                    <DropdownMenuSeparator data-oid="cjyre17" />
                    <DropdownMenuItem data-oid="xjh0ho0">
                        <span data-oid="sj.mhmf">Exit</span>
                    </DropdownMenuItem>
                </DropdownMenu>
            </div>
        );
    },
    environmentProps: {
        windowWidth: 460,
        windowHeight: 320,
    },
});
