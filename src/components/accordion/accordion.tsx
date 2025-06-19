import { useState } from 'react';
import classNames from 'classnames';
import { getClickableElementAttributes } from '~/src/wix/utils';
import { DropdownIcon } from '../icons';

import styles from './accordion.module.scss';

interface AccordionItem {
    header: React.ReactNode;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    initialOpenItemIndex?: number;
    className?: string;
    small?: boolean;
    expandIcon?: React.ReactNode;
    collapseIcon?: React.ReactNode;
}

export const Accordion = ({
    items,
    initialOpenItemIndex,
    className,
    small = false,
    expandIcon,
    collapseIcon,
}: AccordionProps) => {
    const [openItemIndex, setOpenItemIndex] = useState<number | null>(initialOpenItemIndex ?? null);

    return (
        <div className={classNames({ [styles.small]: small }, className)} data-oid=":le80to">
            {items.map((item, index) => {
                const isOpen = openItemIndex === index;

                return (
                    <div key={index} className={styles.item} data-oid="da-0u1v">
                        <div
                            className={styles.header}
                            {...getClickableElementAttributes(() =>
                                setOpenItemIndex(isOpen ? null : index),
                            )}
                            data-oid="j16tk8b"
                        >
                            <div className={styles.headerContent} data-oid="m7j8z9x">
                                {item.header}
                            </div>

                            <div className={styles.toggleIconContainer} data-oid="48-s8wp">
                                {isOpen
                                    ? collapseIcon || (
                                          <DropdownIcon
                                              width={12}
                                              className={styles.collapseIcon}
                                              data-oid="tbv:mji"
                                          />
                                      )
                                    : expandIcon || <DropdownIcon width={12} data-oid="n46k8:a" />}
                            </div>
                        </div>

                        <div
                            className={classNames(styles.content, {
                                [styles.expanded]: isOpen,
                            })}
                            data-oid="3jgubnf"
                        >
                            <div className={styles.contentExpander} data-oid="oj-u_ku">
                                <div className={styles.contentInner} data-oid="kyxv-rq">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
