import { getHomePage, PageData } from '../lib/query';
import { SEO, Country } from '../components';

type HomeProps = PageData;

export default function Home({ page, navigation, categories }: HomeProps) {
  const { title, description, canonical } = page;

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`${canonical}`}
        url={`/${page.pathname}`}
      />
      <Country page={page} navigation={navigation} categories={categories} />
    </>
  );
}

export async function getStaticProps() {
  const { page, navigation, categories } = await getHomePage();

  return {
    props: {
      page,
      navigation: navigation,
      categories,
    },
    revalidate: 5,
  };
}
