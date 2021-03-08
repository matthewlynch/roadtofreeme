import { request, gql } from 'graphql-request';

import { RootQuery } from '../generated/graphql';
import { ValidatedPage, ValidatedCategory, NavigationLink } from '../types';
import { isValidPage, validatePageLinks, validateCategories } from './validate';

export interface PageData {
  page: ValidatedPage;
  navigation: NavigationLink[];
  categories: ValidatedCategory[];
}

const graphqlUrl = `https://${process.env.SANITY_PROJECT_ID}.apicdn.sanity.io/v1/graphql/${process.env.SANITY_DATASET}/default`;

const FRAGMENT_PAGE_DATA = gql`
  fragment PageData on Page {
    _id
    _createdAt
    _updatedAt
    title
    pathname
    description
    canonical
    countryName
    emoji
    headingOne
    pageDescription
    timeline {
      _id
      date
      activities {
        _id
        description
        emoji
        categories {
          _id
        }
      }
    }
    indexPage
    indexTitle
    indexDescription
    indexHeadingOne
    indexPageDescription
  }
`;

const FRAGMENT_PAGE_LINK_DATA = gql`
  fragment PageLinkData on Page {
    _id
    pathname
    countryName
    indexPage
    emoji
  }
`;

const FRAGMENT_CATEGORY_DATA = gql`
  fragment CategoryData on Category {
    _id
    label
    emoji
  }
`;

export async function getAllActivePagePathnames() {
  const query = gql`
    query {
      allPage(where: { active: { eq: true } }, sort: { countryName: ASC }) {
        pathname
      }
    }
  `;

  const data = await request<RootQuery>(graphqlUrl, query);

  return data.allPage;
}

export async function getHomePage(): Promise<PageData> {
  const query = gql`
    query HomePage {
      page: allPage(
        where: { active: { eq: true }, indexPage: { eq: true } }
        limit: 1
      ) {
        ...PageData
      }
      countries: allPage(
        where: { active: { eq: true } }
        sort: { countryName: ASC }
      ) {
        ...PageLinkData
      }
      categories: allCategory {
        ...CategoryData
      }
    }
    ${FRAGMENT_PAGE_DATA}
    ${FRAGMENT_PAGE_LINK_DATA}
    ${FRAGMENT_CATEGORY_DATA}
  `;

  const data = await request(graphqlUrl, query);
  const page = data.page[0];

  // Break the build if there isn't a home page set
  if (!page) {
    throw Error('No home page found');
  }

  // Replace meta content for the home page if it exist
  const updatedPage = { ...page };

  if (updatedPage.indexTitle) {
    updatedPage.title = page.indexTitle;
  }

  if (updatedPage.indexDescription) {
    updatedPage.description = page.indexDescription;
  }

  if (updatedPage.indexHeadingOne) {
    updatedPage.headingOne = page.indexHeadingOne;
  }

  if (updatedPage.indexPageDescription) {
    updatedPage.pageDescription = page.indexPageDescription;
  }

  return {
    page: updatedPage,
    navigation: validatePageLinks(data.countries),
    categories: validateCategories(data.categories),
  };
}

export async function getPageDataByPathname(
  pathname: string
): Promise<PageData> {
  const query = gql`
    query PageDetails($pathname: String) {
      page: allPage(
        where: { active: { eq: true }, pathname: { eq: $pathname } }
      ) {
        ...PageData
      }
      countries: allPage(
        where: { active: { eq: true } }
        sort: { countryName: ASC }
      ) {
        ...PageLinkData
      }
      categories: allCategory {
        ...CategoryData
      }
    }
    ${FRAGMENT_PAGE_DATA}
    ${FRAGMENT_PAGE_LINK_DATA}
    ${FRAGMENT_CATEGORY_DATA}
  `;

  const data = await request(graphqlUrl, query, { pathname });

  if (!isValidPage(data.page[0])) {
    throw Error(`Page "${pathname}" has invalid data`);
  }

  return {
    page: data.page[0],
    navigation: validatePageLinks(data.countries),
    categories: validateCategories(data.categories),
  };
}
