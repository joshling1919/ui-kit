import without from 'lodash.without';
import invariant from 'invariant';
import uniq from 'lodash.uniq';
import filterDataAttributes from './filter-data-attributes';

export const getId = (idPrefix, language) =>
  idPrefix ? `${idPrefix}.${language}` : undefined;
export const getName = (namePrefix, language) =>
  namePrefix ? `${namePrefix}.${language}` : undefined;

export const getPrimaryLanguage = language => language.split('-')[0];

// splits the languages into two groups:
//  - the first group starts with the same tag as the selected language
//  - the second group starts with a different tag
export const splitLanguagesByPrimaryLanguage = (key, languages) => {
  const primaryLanguage = getPrimaryLanguage(key);
  return languages.reduce(
    (groupedLanguages, language) => {
      if (primaryLanguage === getPrimaryLanguage(language)) {
        groupedLanguages[0].push(language);
      } else {
        groupedLanguages[1].push(language);
      }
      return groupedLanguages;
    },
    [[], []]
  );
};

// sorts the languages with the following priority:
// - The selected language is excluded (e.g pt-BR)
// - All languages using the same primary language as the selected language follow (e.g. pt, pt-PT).
//   They are sorted alphabetically
// - All other languages follow, sorted alphabetically
export const sortRemainingLanguages = (selectedLanguage, allLanguages) => {
  const remainingLanguages = without(allLanguages, selectedLanguage);

  const [
    languagesWithSameKeyAsSelectedLanguage,
    otherLanguages,
  ] = splitLanguagesByPrimaryLanguage(selectedLanguage, remainingLanguages);

  return [
    ...languagesWithSameKeyAsSelectedLanguage.sort(),
    ...otherLanguages.sort(),
  ];
};

export const createLocalizedDataAttributes = (props, language) =>
  Object.entries(filterDataAttributes(props)).reduce((acc, [key, value]) => {
    switch (key) {
      case 'data-track-component':
      case 'data-test':
        acc[key] = `${value}-${language}`;
        break;
      default:
        acc[key] = value;
    }
    return acc;
  }, {});

export const getHasErrorOnRemainingLanguages = (errors, selectedLanguage) =>
  Boolean(errors) && without(Object.keys(errors), selectedLanguage).length > 0;

export const createLocalizedString = (languages, existingTranslations = {}) => {
  const mergedLanguages = existingTranslations
    ? uniq([...languages, ...Object.keys(existingTranslations)])
    : languages;

  return mergedLanguages.reduce((localizedString, language) => {
    // eslint-disable-next-line no-param-reassign
    localizedString[language] =
      (existingTranslations && existingTranslations[language]) || '';
    return localizedString;
  }, {});
};

export const isEmpty = localizedString => {
  if (!localizedString) return true;
  return Object.values(localizedString).every(
    value => !value || value.trim().length === 0
  );
};

export const omitEmptyTranslations = localizedString => {
  invariant(
    typeof localizedString === 'object',
    'omitEmptyTranslations must be called with an object'
  );
  return Object.entries(localizedString).reduce(
    (localizedStringWithoutEmptyTranslations, [language, value]) => {
      if (value && value.trim().length > 0) {
        // eslint-disable-next-line no-param-reassign
        localizedStringWithoutEmptyTranslations[language] = value;
      }
      return localizedStringWithoutEmptyTranslations;
    },
    {}
  );
};

export const isTouched = touched =>
  Boolean(touched) && Object.values(touched).some(Boolean);
