import { products } from '@wix/stores';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getClickableElementAttributes } from '~/src/wix/utils';
import { ImagePlaceholderIcon } from '../icons';

import styles from './product-images.module.scss';

interface ProductImagesProps {
    media?: products.Media;
}

export const ProductImages = ({ media }: ProductImagesProps) => {
    const [selectedImage, setSelectedImage] = useState<products.MediaItem | undefined>(
        media?.mainMedia,
    );

    // The media can change when another product variant was selected and it has
    // a different set of media items. In this case make sure the selected image is refreshed.
    useEffect(() => {
        setSelectedImage(media?.mainMedia);
    }, [media]);

    const imageItems = media?.items?.filter((item) => item.image !== undefined);

    return (
        <div data-oid="2sv4o5z">
            <div className={styles.mainImageWrapper} data-oid="t92wikf">
                {selectedImage && selectedImage.image ? (
                    <img
                        className={styles.mainImage}
                        src={selectedImage.image.url}
                        alt={selectedImage.image.altText ?? ''}
                        data-oid="vxhlee2"
                    />
                ) : (
                    <ImagePlaceholderIcon
                        className={styles.imagePlaceholderIcon}
                        data-oid="c8-.8d-"
                    />
                )}
            </div>

            {imageItems && imageItems.length > 0 && (
                <div className={styles.thumbnails} data-oid="fb-bele">
                    {imageItems.map((item) => (
                        <div
                            key={item._id}
                            className={classNames(styles.thumbnail, {
                                [styles.selected]: selectedImage && selectedImage._id === item._id,
                            })}
                            {...getClickableElementAttributes(() => setSelectedImage(item))}
                            data-oid="d_gp.i6"
                        >
                            <img
                                className={styles.thumbnailImage}
                                src={item.image!.url}
                                alt={item.image!.altText ?? ''}
                                data-oid="p.kc_5j"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
