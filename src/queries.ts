import { gql } from '@apollo/client';

export const COUNTRIES = gql`
  query($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
    }
  }
`;

export const COUNTRY = gql`
  query($code: ID!) {
    country(code: $code) {
      name
      phone
      currency
      capital
      languages {
        name
      }
      emoji
      continent {
        name
        code
      }
    }
  }
`;

export const CONTINENTS = gql`
  query {
    continents {
      code
      name
    }
  }
`;
