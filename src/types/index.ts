export type NavigationLink = {
  _id: string;
  countryName: string;
  emoji: string;
  indexPage: boolean;
  pathname: string;
};

export type ValidatedPage = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  pathname: string;
  description: string;
  canonical: string | null;
  countryName: string;
  emoji: string;
  headingOne: string;
  pageDescription: string;
  timeline: ValidatedStep[];
  indexPage: boolean;
  indexTitle: string | null;
  indexDescription: string | null;
  indexHeadingOne: string | null;
  indexPageDescription: string | null;
};

export type ValidatedStep = {
  _id: string;
  date: string;
  activities: ValidatedActivity[];
};

export type ValidatedActivity = {
  _id: string;
  description: string;
  emoji: string;
  categories: ApplicableCategory[] | null;
};

export type ApplicableCategory = {
  _id: string;
};

export type ValidatedCategory = {
  _id: string;
  label: string;
  emoji: string;
};

export type FilteredCategories = string[];
