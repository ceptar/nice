import classNames from 'classnames';

import styles from './color-select.module.scss';

export interface ColorSelectOption {
    id: string;
    color: string;
    crossedOut?: boolean;
}

export interface ColorSelectProps {
    options: ColorSelectOption[];
    selectedId: string;
    onChange: (id: string) => void;
    hasError?: boolean;
    className?: string;
}

export const ColorSelect = ({
    options,
    selectedId,
    onChange,
    hasError,
    className,
}: ColorSelectProps) => {
    return (
        <div
            className={classNames(styles.root, { [styles.hasError]: hasError }, className)}
            data-oid="anbyais"
        >
            {options.map((option) => (
                <button
                    key={option.id}
                    className={classNames(styles.option, {
                        [styles.selected]: selectedId === option.id,
                        [styles.crossedOut]: option.crossedOut,
                    })}
                    onClick={() => onChange(option.id)}
                    data-oid="zju-rm9"
                >
                    <div
                        className={styles.colorBox}
                        style={{ backgroundColor: option.color }}
                        data-oid="zzio:7o"
                    ></div>
                </button>
            ))}
        </div>
    );
};
