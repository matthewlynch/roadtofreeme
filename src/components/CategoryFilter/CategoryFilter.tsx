import * as React from 'react';
import classnames from 'classnames';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import { ValidatedCategory, FilteredCategories } from '../../types';
import styles from './CategoryFilter.module.css';

const HIDE_IN_SAFARI_READER_CSS_CLASS = 'instapaper_ignore';

type ToggleCategory = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface CategoryFiltersProps {
  categories: ValidatedCategory[];
  filteredCategories: FilteredCategories;
  toggleCategory: ToggleCategory;
}

export function CategoryFilter({
  categories,
  filteredCategories,
  toggleCategory,
}: CategoryFiltersProps) {
  return (
    <Accordion
      allowZeroExpanded
      className={classnames(styles.accordion, HIDE_IN_SAFARI_READER_CSS_CLASS)}
    >
      <AccordionItem uuid="categories-accordion">
        <AccordionItemHeading>
          <AccordionItemButton className={styles.accordion__button}>
            Filter by category:
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={styles.accordion__panel}>
          <fieldset className={styles.fieldset}>
            <legend className="sr-only">Categories:</legend>
            <div className={styles.categories} data-testid="categories">
              {categories.map((category) => (
                <Category
                  key={category._id}
                  category={category}
                  filteredCategories={filteredCategories}
                  toggleCategory={toggleCategory}
                />
              ))}
            </div>
          </fieldset>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}

interface CategoryProps {
  category: ValidatedCategory;
  filteredCategories: FilteredCategories;
  toggleCategory: ToggleCategory;
}

function Category({
  category,
  filteredCategories,
  toggleCategory,
}: CategoryProps) {
  const elementId = `category-${category._id}`;
  const isActive = filteredCategories.includes(category._id);

  return (
    <div>
      <input
        id={elementId}
        className={classnames('sr-only', styles.categories__input)}
        checked={isActive}
        onChange={toggleCategory}
        type="checkbox"
        value={category._id}
      />
      <label
        className={classnames(styles.category, {
          [styles['category--active']]: isActive,
        })}
        htmlFor={elementId}
      >
        <span aria-hidden="true" className={styles.category__icon}>
          {category.emoji}
        </span>{' '}
        <span>{category.label}</span>
      </label>
    </div>
  );
}
