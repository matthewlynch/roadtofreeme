import * as React from 'react';
import { isFuture } from 'date-fns';

import { PageData } from '../../lib/query';
import { ValidatedStep, FilteredCategories } from '../../types';
import {
  Activities,
  CategoryFilter,
  Container,
  Navigation,
  Header,
  Footer,
} from '../';
import { Timeline } from '../Timeline';

type CountryProps = PageData;

export function Country({ page, navigation, categories }: CountryProps) {
  const [
    filteredCategories,
    setFilteredCategories,
  ] = React.useState<FilteredCategories>([]);
  const { activities, steps } = filterTimelineSteps(
    page.timeline,
    filteredCategories
  );
  const handleToggleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (filteredCategories.includes(value)) {
      setFilteredCategories(
        filteredCategories.filter((category) => category !== value)
      );
    } else {
      setFilteredCategories([...filteredCategories, value]);
    }
  };

  return (
    <Container>
      <Header heading={page.headingOne} description={page.pageDescription} />
      <Navigation links={navigation} />
      <CategoryFilter
        categories={categories}
        filteredCategories={filteredCategories}
        toggleCategory={handleToggleCategory}
      />
      {activities.length > 0 && <Activities activities={activities} />}
      {steps.length > 0 && (
        <Timeline name={`${page.countryName}`} timeline={steps} />
      )}
      <Footer />
    </Container>
  );
}

function filterTimelineSteps(
  timeline: ValidatedStep[],
  filteredCategories: FilteredCategories
) {
  const presentSteps: ValidatedStep[] = [];
  let futureSteps: ValidatedStep[] = [];

  // Split the steps between present & future
  timeline.forEach((step) => {
    if (isFuture(new Date(step.date))) {
      futureSteps.push(step);
    } else {
      presentSteps.push(step);
    }
  });

  // Map over future steps to update their activities based on the categories
  // that are being filtered
  if (filteredCategories.length > 0) {
    futureSteps = futureSteps
      .map((step) => ({
        ...step,
        activities: filterActivities(step.activities, filteredCategories),
      }))
      .filter((step) => step.activities.length > 0);
  }

  // Flatten present activities
  const activities = presentSteps.reduce((allActivities: any, step) => {
    const filteredActivities = filterActivities(
      step.activities,
      filteredCategories
    );

    if (filteredActivities.length) {
      return [...allActivities, ...filteredActivities];
    }

    return allActivities;
  }, []);

  return {
    activities,
    steps: futureSteps,
  };
}

function filterActivities(
  activities: ValidatedStep['activities'],
  filteredCategories: FilteredCategories
) {
  if (!filteredCategories.length) {
    return activities;
  }

  return activities.filter((activity) => {
    const { categories } = activity;
    const activityCategories = Array.isArray(categories) ? categories : [];

    for (const category of activityCategories) {
      if (category && filteredCategories.includes(category._id)) {
        return true;
      }
    }
    return false;
  });
}
