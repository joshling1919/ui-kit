import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { Value } from 'react-value';
import Section from '../.storybook/decorators/section';
import TextInputReadme from './text-input/README.md';
import NumberInputReadme from './number-input/README.md';
import MoneyInputReadme from './money-input/README.md';
import TextInput from './text-input';
import NumberInput from './number-input';
import MoneyInput from './money-input';

storiesOf('Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(TextInputReadme))
  .add('TextInput', () => (
    <Section>
      <TextInput
        name={text('name', '')}
        value={text('value', '')}
        onChange={action('onChange')}
        isAutofocussed={boolean('isAutofocussed', false)}
        isDisabled={boolean('isDisabled', false)}
        isReadOnly={boolean('isReadOnly', false)}
        hasError={boolean('hasError', false)}
        hasWarning={boolean('hasWarning', false)}
        placeholder={text('placeholder', 'Placeholder')}
        horizontalConstraint={select(
          'horizontalConstraint',
          ['xs', 's', 'm', 'l', 'xl', 'scale'],
          'm'
        )}
      />
    </Section>
  ))
  .addDecorator(withReadme(NumberInputReadme))
  .add('NumberInput', () => (
    <Section>
      <Value
        defaultValue={undefined}
        render={(value, onChange) => (
          <NumberInput
            name={text('name', '')}
            value={value}
            onChange={event => onChange(event.target.value)}
            min={text('min', '')}
            max={text('max', '')}
            step={text('step', '')}
            isAutofocussed={boolean('isAutofocussed', false)}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            placeholder={text('placeholder', 'Placeholder')}
            horizontalConstraint={select(
              'horizontalConstraint',
              ['xs', 's', 'm', 'l', 'xl', 'scale'],
              'm'
            )}
          />
        )}
      />
    </Section>
  ))
  .addDecorator(withReadme(MoneyInputReadme))
  .add('MoneyInput', () => (
    <Section>
      <IntlProvider locale="en">
        <Value
          defaultValue={MoneyInput.getInputValueFromMoneyValue({
            centAmount: 20,
            currencyCode: 'EUR',
          })}
          render={(value, onChange) => (
            <MoneyInput
              value={value}
              language="en"
              currencies={
                boolean('dropdown', true) ? ['EUR', 'USD', 'AED'] : undefined
              }
              enableHpp={boolean('enableHpp', false)}
              placeholder={text('placeholder', 'Placeholder')}
              onBlur={(...args) => action('onBlur')(...args)}
              isDisabled={boolean('isDisabled', false)}
              onChange={(...args) => {
                action('onChange')(...args);
                onChange(...args);
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
  ));
