import { isValid } from 'date-fns';

import { Category, Page } from '../generated/graphql';
import {
  NavigationLink,
  ValidatedPage,
  ValidatedStep,
  ValidatedActivity,
  ValidatedCategory,
} from '../types';

export function validatePageLinks(pages: Page[]) {
  return pages.filter(isPageLink);
}

export function isPageLink(page: Page): page is NavigationLink {
  return !!(page._id && page.countryName && page.emoji && page.pathname);
}

export function validateCategories(categories: Category[]) {
  return categories.filter(isCategory);
}

export function isCategory(category: Category): category is ValidatedCategory {
  return !!(category._id && category.label && category.emoji);
}

export function isValidPage(page: Page): page is ValidatedPage {
  const requiredStringProperties = [
    '_id',
    '_createdAt',
    '_updatedAt',
    'title',
    'pathname',
    'description',
    'countryName',
    'emoji',
    'headingOne',
    'pageDescription',
  ];

  for (const prop of requiredStringProperties) {
    if (typeof getKeyValue(prop)(page) !== 'string') {
      return false;
    }
  }

  if (!Array.isArray(page.timeline)) {
    return false;
  }

  // Make sure this page has at least one valid step
  const validTimelineSteps = page.timeline.filter(isValidatedStep);

  return validTimelineSteps.length > 0;
}

export function isValidatedStep(step: any): step is ValidatedStep {
  if (
    !step ||
    typeof step._id !== 'string' ||
    typeof step.date !== 'string' ||
    !Array.isArray(step.activities)
  ) {
    return false;
  }

  if (!isValid(new Date(step.date))) {
    return false;
  }

  // Make sure that this step has at least one valid activity
  const validActivities = step.activities.filter(isValidActivity);

  return validActivities.length > 0;
}

function isValidActivity(activity: any): activity is ValidatedActivity {
  // Categories are optional on an activity
  return !(
    !activity ||
    typeof activity._id !== 'string' ||
    typeof activity.description !== 'string' ||
    typeof activity.emoji !== 'string'
  );
}

// This little helper allows us to look up indexes using strings and stops
// TypeScript erroring. This could be improved by extending the types we're
// interested in.
export function getKeyValue(key: string) {
  return (obj: Record<string, any>) => obj[key];
}
