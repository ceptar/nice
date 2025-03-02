import { useState } from 'react';
import { createBoard } from '@wixc3/react-board';
import { Select, SelectItem } from '~/src/components/select/select';

import styles from './select.board.module.scss';

export default createBoard({
    name: 'Select',
    Board: () => {
        const [value, setValue] = useState('');
        return (
            <div className={styles.container} data-oid="ogap:en">
                <Select
                    value={value}
                    onValueChange={setValue}
                    placeholder="Choose a pet"
                    data-oid="5x4dkol"
                >
                    <SelectItem value="dog" data-oid="tfb:88j">
                        Dog
                    </SelectItem>
                    <SelectItem value="cat" data-oid="9lgsmq7">
                        Cat
                    </SelectItem>
                    <SelectItem value="hamster" data-oid="47o-dar">
                        Hamster
                    </SelectItem>
                    <SelectItem value="parrot" data-oid="37y0v78">
                        Parrot
                    </SelectItem>
                    <SelectItem value="spider" data-oid="_zn1_1h">
                        Spider
                    </SelectItem>
                    <SelectItem value="goldfish" data-oid="xue7_bj">
                        Goldfish
                    </SelectItem>
                </Select>
            </div>
        );
    },
    environmentProps: {
        windowWidth: 400,
        windowHeight: 400,
    },
});
