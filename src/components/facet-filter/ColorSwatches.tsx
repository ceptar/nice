import { getTailwindColorClass } from './GetTailwindColorClass';
import { ColorSwatchesProps } from '~/src/vendure/providers/interfaces';

export function ColorSwatches({ colors, direction = "horizontal" }: ColorSwatchesProps & { direction?: 'horizontal' | 'vertical' }) {
    const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row';

    return (
        <div className={`flex ${flexDirection} items-center gap-1 p-1 justify-center`} data-oid="diuzbr9">
            {colors.map((color) => (
                <div key={color.id} data-oid="eby77a7">
                    <div
                        className={`rounded-full h-5 w-5 ${getTailwindColorClass(color.name)}`}
                        title={color.name}
                        data-oid="8fd70z4"
                    />
                </div>
            ))}
        </div>
    );
}