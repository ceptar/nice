import classNames from 'classnames';
import { FacebookIcon, PinterestIcon, WhatsAppIcon } from '../icons';
import styles from './share-product-links.module.scss';

interface ShareProductLinksProps {
    productCanonicalUrl: string;
    className?: string;
}

export const ShareProductLinks = ({ productCanonicalUrl, className }: ShareProductLinksProps) => {
    const productEncodedUrl = encodeURIComponent(productCanonicalUrl);
    return (
        <div className={classNames(styles.links, className)} data-oid="ivocpjb">
            <a
                href={`https://api.whatsapp.com/send?text=${productEncodedUrl}`}
                target="_blank"
                rel="noreferrer"
                data-oid="klqiwgg"
            >
                <WhatsAppIcon className={styles.icon} data-oid="nsvxl5l" />
            </a>

            <a
                href={`http://www.facebook.com/sharer.php?u=${productEncodedUrl}`}
                target="_blank"
                rel="noreferrer"
                data-oid="em4_4yf"
            >
                <FacebookIcon className={styles.icon} data-oid="mj72irs" />
            </a>

            <a
                href={`http://pinterest.com/pin/create/button/?url=${productEncodedUrl}`}
                target="_blank"
                rel="noreferrer"
                data-oid="_xd918w"
            >
                <PinterestIcon className={styles.icon} data-oid="7dr-5po" />
            </a>
        </div>
    );
};
