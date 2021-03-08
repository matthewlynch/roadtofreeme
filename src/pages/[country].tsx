import { GetStaticPaths, GetStaticProps } from 'next';

import {
  getAllActivePagePathnames,
  getPageDataByPathname,
  PageData,
} from '../lib/query';
import { Country, SEO } from '../components';

type CountryPageProps = PageData;

export function CountryPage({
  page,
  navigation,
  categories,
}: CountryPageProps) {
  const { title, description, canonical } = page;

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        url={`/${page.pathname}`}
      />
      <Country page={page} navigation={navigation} categories={categories} />
    </>
  );
}

export default CountryPage;

// See https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
// for more information on how getPageDataByPathname() is being used
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get the page by pathname
  const pathname = `${params && params.country}`;
  const { page, categories, navigation } = await getPageDataByPathname(
    pathname
  );

  return {
    props: {
      page,
      navigation: navigation,
      categories,
    },
    revalidate: 5, // Re-generate this page every 5 seconds at most, when a request comes in
  };
};

// See https://nextjs.org/docs/basic-features/pages#scenario-2-your-page-paths-depend-on-external-data
// for more information on how getStaticPaths() is being used
export const getStaticPaths: GetStaticPaths = async () => {
  // Get active pages from Sanity
  const pages = await getAllActivePagePathnames();

  // Get the paths we need to prerender
  const paths = pages.map((page) => ({
    params: { country: `${page.pathname}` },
  }));

  return {
    paths, // Prerender these pages at build time
    fallback: false, // Return a 404 for any pages that don't exist
  };
};
