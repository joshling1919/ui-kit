import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs } from '@storybook/addon-knobs';
import { Section } from '../.storybook/decorators';
import { Text, Spacings } from '../src';
import DesignTokens from './design-tokens.md';

const Story = () => (
  <Section>
    <Spacings.Stack>
      <Text.Headline>Design Tokens</Text.Headline>
      <Text.Body>
        A list of choices, states, tokens and so on will follow here. Check out
        the readme for now.
      </Text.Body>
    </Spacings.Stack>
  </Section>
);
Story.displayName = 'Story';

storiesOf('Philosophy|Principles', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DesignTokens))
  .add('Design Tokens', () => <Story />);
