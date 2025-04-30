import { getTailwindColorClass } from './GetTailwindColorClass';
import { ColorSwatchesProps } from '~/src/vendure/providers/interfaces';

export function ColorSwatches({ colors }: ColorSwatchesProps) {
    return (
        <div className="flex flex-row items-center justify-center" data-oid="diuzbr9">
            {colors.map((color) => (
                <div key={color.id} data-oid="eby77a7">
                    <div
                        // dieses div absolut setzen, wenn ein weiterer layer wie DiscoLightningInner benutzt wird
                        className={`
            rounded-full h-5 w-5 mx-[2px] ${getTailwindColorClass(color.name)}`}
                        title={color.name}
                        data-oid="8fd70z4"
                    />
                </div>
            ))}
        </div>
    );
}
