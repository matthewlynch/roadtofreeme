import * as React from 'react';
// import { advanceBy, advanceTo, clear } from 'jest-date-mock';

import { render, screen } from '../testUtils';
import { mockNextUseRouter } from '../utils/mock-use-router';
import { CountryPage } from '../../src/pages/[country]';
import pageData from '../data/home-page-data.json';

describe('CountryPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    mockNextUseRouter({
      asPath: '/',
      route: '/',
      pathname: '/',
      query: '',
    });

    render(
      <CountryPage
        page={pageData.page}
        navigation={pageData.countries}
        categories={pageData.categories}
      />
    );

    // H1 has been rendered
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      pageData.page.headingOne
    );

    // Page description rendered
    expect(screen.getByText(pageData.page.pageDescription)).toBeInTheDocument();

    // Check navigation has rendered links properly
    pageData.countries.forEach((link) => {
      const navLink = screen.getByRole('link', { name: link.countryName });
      expect(navLink).toBeInTheDocument();

      if (link.indexPage) {
        expect(navLink).toHaveAttribute('aria-current', 'true');
      }
    });

    // Will be adding more tests soon!
  });
});
