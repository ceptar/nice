import classNames from 'classnames';
import styles from './cart-icon.module.scss';

interface CartIconProps {
    className?: string;
    count: number;
}

export const CartIcon = (props: CartIconProps) => {
    return (
        <div className={classNames(styles.root, props.className)} data-oid="p2rshk2">
            <div className={styles.handle} data-oid="4_fanh8"></div>
            <div className={styles.bag} data-oid="84kxayh">
                {props.count}
            </div>
        </div>
    );
};
