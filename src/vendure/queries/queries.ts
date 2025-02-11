import { gql } from 'graphql-request';

export const GET_COLLECTIONS = gql`
    query collections($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                featuredAsset {
                    id
                    preview
                    source
                }
                id
                name
                parent {
                    id
                    name
                    slug
                }
                slug
            }
        }
    }
`;

export const GET_COLLECTION_PRODUCTS = gql`
    query collectionProducts($slug: String, $skip: Int, $take: Int) {
        collection(slug: $slug) {
            id
            name
            slug
            description
            featuredAsset {
                id
                preview
            }
        }
        search(input: { collectionSlug: $slug, groupByProduct: true, skip: $skip, take: $take }) {
            totalItems
            items {
                productId
                productName
                slug
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on SinglePrice {
                        value
                    }
                    ... on PriceRange {
                        min
                        max
                    }
                }
                currencyCode
            }
        }
    }
`;
