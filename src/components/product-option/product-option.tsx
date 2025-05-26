import { products } from '@wix/stores';
import { ColorSelect } from '~/src/components/color-select/color-select';
import { getChoiceValue } from '~/src/wix/products';
import { Select, SelectItem } from '~/src/components/select/select';
import { ErrorIcon } from '../icons';

import styles from './product-option.module.scss';

export interface ProductOptionProps {
    option: products.ProductOption;
    selectedChoice: products.Choice | undefined;
    error: string | undefined;
    onChange: (choice: products.Choice) => void;
}

export const ProductOption = ({ option, selectedChoice, error, onChange }: ProductOptionProps) => {
    const { name, optionType, choices } = option;

    if (name === undefined || choices === undefined || optionType === undefined) {
        return null;
    }

    const handleChange = (value: string) => {
        const newSelectedChoice = choices.find((c) => getChoiceValue(optionType, c) === value);
        if (newSelectedChoice) {
            onChange(newSelectedChoice);
        }
    };

    const hasError = error !== undefined;

    return (
        <div className={styles.root} data-oid="0vn8m5k">
            <div className="paragraph2" data-oid="05rjl2-">
                {name}
                {selectedChoice && `: ${selectedChoice.description}`}
            </div>

            {optionType === products.OptionType.color ? (
                <ColorSelect
                    className="colorSelect"
                    // `description` is what identifies the color choice. It's the unique color name.
                    // `value` is the color value, which can be repeated in different color choices.
                    options={choices
                        .filter((c) => c.value && c.description && c.visible)
                        .map((c) => ({
                            id: c.description!,
                            color: c.value!,
                            crossedOut: !c.inStock,
                        }))}
                    selectedId={selectedChoice?.description ?? ''}
                    onChange={handleChange}
                    hasError={hasError}
                    data-oid="208k2_8"
                />
            ) : (
                <Select
                    placeholder={`Select ${name}`}
                    value={selectedChoice?.value ?? ''}
                    onValueChange={handleChange}
                    hasError={hasError}
                    data-oid="b970fa0"
                >
                    {choices
                        .filter((c) => c.value && c.description && c.visible)
                        .map((c) => (
                            <SelectItem key={c.value} value={c.value!} data-oid="-r_2l33">
                                {c.description}
                                {!c.inStock && ` (out of stock)`}
                            </SelectItem>
                        ))}
                </Select>
            )}

            {hasError && (
                <div className={styles.error} data-oid="osdwywm">
                    <ErrorIcon width={18} height={18} data-oid="q0yx2dp" />
                    {error}
                </div>
            )}
        </div>
    );
};
