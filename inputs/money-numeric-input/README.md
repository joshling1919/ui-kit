# MoneyNumericInput

#### Description

A controlled input component for money values with validation states.

## Usage

```js
import MoneyNumericInput from '@commercetools-local/ui-kit/inputs/money-numeric-input';

<MoneyNumericInput language="en" value={10} />;
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                                                                    |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                 | `string` |    -     | -                                  | -       | Used as HTML `name` property                                                                                                                   |
| `value`                | `number` |    -     | -                                  | -       | Value of the input. This is a number as the parent is responsible for formatting the value as money.                                           |
| `language`             | `string` |    ✅    | -                                  | -       | Language of the input. This is a string as the parent is responsible for converting it into a money value according to format of the language. |
| `placeholder`          | `string` |    -     | -                                  | -       | Placeholders for each language. Object of the same shape as `value`.                                                                           |
| `onChange`             | `func`   |    -     | -                                  | -       | Called with the event including the new formatted value. When the value is deleted the event passes `undefined`.                               |
| `onBlur`               | `func`   |    -     | -                                  | -       | Called when field is blurred                                                                                                                   |
| `hasError`             | `bool`   |    -     | -                                  | -       | Indicates the input field has an error                                                                                                         |
| `hasWarning`           | `bool`   |    -     | -                                  | -       | Indicates the input field has a warning                                                                                                        |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised)                                                                                   |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                     |