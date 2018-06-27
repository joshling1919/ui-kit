import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { Value } from 'react-value';
import Section from '../../.storybook/decorators/section';
import MoneyInputReadme from './README.md';
import MoneyInput from './money-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(MoneyInputReadme))
  .add('MoneyInput', () => {
    const currencies = ['EUR', 'USD', 'AED', 'KWD'];
    const defaultCurrencyCode = select(
      'default value currencyCode',
      ['', ...currencies],
      ''
    );
    const defaultAmount = text('default value amount', '');
    return (
      <div>
        <Section>
          <IntlProvider locale="en">
            <Value
              key={`${defaultCurrencyCode}-${defaultAmount}`}
              defaultValue={{
                amount: defaultAmount,
                currencyCode: defaultCurrencyCode,
              }}
              render={(value, onChange) => (
                <MoneyInput
                  value={value}
                  currencies={
                    boolean('dropdown', true) ? currencies : undefined
                  }
                  placeholder={text('placeholder', 'Placeholder')}
                  onBlur={(...args) => action('onBlur')(...args)}
                  isDisabled={boolean('isDisabled', false)}
                  onChange={(...args) => {
                    action('onChange')(...args);
                    onChange(...args);
                    // eslint-disable-next-line no-console
                    console.log(
                      'parsed',
                      MoneyInput.convertToMoneyValue(args[0])
                    );
                  }}
                  hasCurrencyError={boolean('hasCurrencyError', false)}
                  hasCurrencyWarning={boolean('hasCurrencyWarning', false)}
                  hasAmountError={boolean('hasAmountError', false)}
                  hasAmountWarning={boolean('hasAmountWarning', false)}
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['s', 'm', 'l', 'xl', 'scale'],
                    'm'
                  )}
                />
              )}
            />
          </IntlProvider>
        </Section>
        <Section>
          <p>
            <i>
              Check the console to see the result of{' '}
              <code>MoneyInput.convertToMoneyValue</code>.
            </i>
          </p>
        </Section>
      </div>
    );
  });