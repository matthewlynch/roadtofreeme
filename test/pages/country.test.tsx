import * as React from 'react';
import MockDate from 'mockdate';

import { render, screen, fireEvent } from '../test-utils';
import { mockNextUseRouter } from '../utils/mock-use-router';
import { CountryPage } from '../../src/pages/[country]';
import pageData from '../data/home-page-data.json';

describe('CountryPage', () => {
  afterEach(() => {
    // Reset mocks
    MockDate.reset();
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    // We need to mock the router for the navigation links
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

    // Category filters should be hidden initially
    const categoryAccordionButton = screen.getByRole('button', {
      name: 'Filter by category:',
    });
    const categoryFiltersContainer = screen.getByTestId('categories');

    expect(categoryFiltersContainer).not.toBeVisible();

    // Open accordion
    fireEvent.click(categoryAccordionButton);

    expect(categoryFiltersContainer).toBeVisible();

    // Check that category filters exist
    pageData.categories.forEach((category) => {
      const label = screen.getByLabelText(category.label, { exact: false });
      expect(label).toBeInTheDocument();
    });
  });

  it('should show the correct amount of timeline steps based on the users date/time', () => {
    // The first date in the timeline is 03/03/2021 (DD/MM/YYYY) so set the date
    // to be March 1st (01/03/2021)
    MockDate.set('2021-03-01');

    // We need to mock the router for the navigation links
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

    const stepsCount = pageData.page.timeline.length;
    const timelineSteps = screen.getAllByTestId('step');

    expect(timelineSteps.length).toEqual(stepsCount);
  });

  it('should show the correct activities based on the users date/time', () => {
    // The first two steps are in March so set the date to be the 1st of April
    MockDate.set('2021-04-01');

    // We need to mock the router for the navigation links
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

    // Check that the activities section has been rendered
    expect(screen.getByTestId('activities')).toBeInTheDocument();

    const activitiesCount =
      pageData.page.timeline[0].activities.length +
      pageData.page.timeline[1].activities.length;
    const activities = screen.getAllByTestId('allowed-activity');

    expect(activities.length).toEqual(activitiesCount);

    // Take away the two steps in March
    const stepsCount = pageData.page.timeline.length - 2;
    const timelineSteps = screen.getAllByTestId('step');

    expect(timelineSteps.length).toEqual(stepsCount);
  });

  it('should allow a user to filter activities', () => {
    // Set a date to future proof this test
    MockDate.set('2021-03-01');

    // We need to mock the router for the navigation links
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

    const initialActivitiesCount = screen.getAllByTestId('activity').length;

    const categoryAccordionButton = screen.getByRole('button', {
      name: 'Filter by category:',
    });

    // Open accordion
    fireEvent.click(categoryAccordionButton);

    // Grooming only has one activity in our test data
    const groomingCategory = screen.getByLabelText('grooming', {
      exact: false,
    });

    // Click to filter by grooming
    fireEvent.click(groomingCategory);

    const filteredActivitiesCount = screen.getAllByTestId('activity').length;

    // Check amount of activities has reduced to one
    expect(initialActivitiesCount).toBeGreaterThan(filteredActivitiesCount);
    expect(filteredActivitiesCount).toEqual(1);

    // Remove the filter
    fireEvent.click(groomingCategory);

    const resetActivitiesCount = screen.getAllByTestId('activity').length;

    // Activities should match the amount we started with
    expect(initialActivitiesCount).toEqual(resetActivitiesCount);
  });
});
