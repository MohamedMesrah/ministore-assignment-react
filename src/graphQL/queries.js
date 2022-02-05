import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query getCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCT_BY_ID = (id) => {
  return gql`
    query getProduct {
        product(id: "${String(id)}") {
        id,
        name,
        inStock,
        gallery,
        description,
        category,
        attributes {
            id,
            name,
            type
        },
        prices {
            currency {
            label,
            symbol
            },
            amount
        },
        brand
        }
    }
    `;
};
