import { useState } from 'react';
import { cart } from '@wix/ecom';
import classNames from 'classnames';
import { DropdownIcon } from '~/src/components/icons';

import styles from './cart-item-options.module.scss';

interface CartItemOptionsProps {
    options: cart.DescriptionLine[];
    /**
     * The maximum amount of options that are visible even in the collapsed state.
     */
    visibleOptionsCount: number;
    className?: string;
}

export const CartItemOptions = ({
    options,
    visibleOptionsCount,
    className,
}: CartItemOptionsProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => setIsExpanded((prev) => !prev);

    return (
        <div
            className={classNames(styles.root, { [styles.expanded]: isExpanded }, className)}
            data-oid="5-u93h1"
        >
            {options.slice(0, isExpanded ? undefined : visibleOptionsCount).map((option) => (
                <div key={option.name!.translated} className="paragraph3" data-oid="29giz4:">
                    {option.name!.translated}:{' '}
                    {option.colorInfo ? option.colorInfo.translated : option.plainText?.translated}
                </div>
            ))}

            {options.length > visibleOptionsCount && (
                <button
                    className={classNames(styles.moreOptionsButton, 'linkButton')}
                    onClick={toggleIsExpanded}
                    data-oid="nsvx:kt"
                >
                    {isExpanded ? 'Less Details' : 'More Details'}
                    <DropdownIcon className={styles.moreOptionsIcon} data-oid="e7sa96o" />
                </button>
            )}
        </div>
    );
};
