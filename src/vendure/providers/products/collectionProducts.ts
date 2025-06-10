import { sdk } from '~/src/vendure/graphqlWrapper';
import { getProductBySlug } from '~/src/vendure/providers/products/products';

interface CollectionProductsInput {
  slug: string;
  facetValueFilters?: Array<{ and: string }>;
  skip?: number;
  take?: number;
}

export async function getCollectionProducts({ 
  slug, 
  facetValueFilters = [], 
  skip = 0, 
  take = 100 
}: CollectionProductsInput) {
  // Create variables object for GraphQL query
  const variables = {
    slug,
    skip,
    take,
    facetValueFilters
  };

  const collectionProducts = await sdk.GetCollectionProducts(variables);

  if (!collectionProducts?.search?.items) {
    throw new Error('No products found');
  }

  const detailedProducts = await Promise.all(
    collectionProducts.search.items.map(async (item) => {
      const productDetail = await getProductBySlug(item.slug, {});
      let categoryName: string | undefined = undefined;
      if (productDetail?.product?.facetValues) {
        const categoryFacetValue = productDetail.product.facetValues.find(
          (fv) => fv.facet.code === 'category' 
        );
        if (categoryFacetValue) {
          categoryName = categoryFacetValue.name;
        }
      }

      return {
  ...item,
        assets: productDetail?.product?.assets?.length ? productDetail.product.assets : [item.productAsset].filter(Boolean),
        featuredAsset: productDetail?.product?.featuredAsset || item.productAsset,
        category: categoryName, // Add the extracted category name here
      };
    })
  );

  return {
    collection: collectionProducts.collection,
    search: {
      ...collectionProducts.search,
      items: detailedProducts,
    },
  };
}

const GET_COLLECTION_PRODUCTS = /*GraphQL*/ `
query GetCollectionProducts($slug: String!, $skip: Int!, $take: Int!, $facetValueFilters: [FacetValueFilterInput!]) {
    collection(slug: $slug) {
      id
      name
      description
      featuredAsset {
        id
        preview
      }
    }
    search(
      input: {
        collectionSlug: $slug,
        groupByProduct: true,
        skip: $skip,
        take: $take,
        facetValueFilters: $facetValueFilters
      }
    ) {
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
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
  }`;
