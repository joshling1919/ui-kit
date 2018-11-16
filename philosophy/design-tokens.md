# 1. Design Tokens

> This document is WIP and subject to change as we learn more about design tokens.

We use design tokens as the smallest form of information in our visual language.
The tokens give semantic meaning to the plain palette of options we have.

<!-- TOC -->

- [1. Design Tokens](#1-design-tokens)
  - [1.1. What are Choices, Decisions and Design Tokens?](#11-what-are-choices-decisions-and-design-tokens)
  - [1.2. Choices](#12-choices)
  - [1.3. Design Tokens](#13-design-tokens)
  - [1.4. Design Tokens limit choices by making desicions](#14-design-tokens-limit-choices-by-making-desicions)
    - [1.4.1. Example for colors](#141-example-for-colors)
    - [1.4.2. Example for font-sizes](#142-example-for-font-sizes)
  - [1.5. Token Structure](#15-token-structure)
  - [1.6. Aspects](#16-aspects)
    - [1.6.1. Aspect: Property](#161-aspect-property)
    - [1.6.2. Aspect: Component Group](#162-aspect-component-group)
    - [1.6.3. Aspect: State](#163-aspect-state)
      - [1.6.3.1. `active` vs `focused`](#1631-active-vs-focused)
    - [1.6.4. Aspect: Modifier](#164-aspect-modifier)
      - [1.6.4.1. `on-dark`](#1641-on-dark)

<!-- /TOC -->

## 1.1. What are Choices, Decisions and Design Tokens?

A design system offers a range of **choices**. The choices are all possible values which can be used. The limit the amount of possible colors.

**Decisions** limit the choices for certain things. For example, only a subset of all available colors can be used for background colors. Another subset of colors can be used for font colors. More specific decisions could be to use a certain color like `color-orange` (from the choices) for the border color of an input component in a disabled state.

Every \*decision** made results in a \***Design Token\*\* which represent that decision by giving it semantic meaning. For example the token `--token-border-color-for-input-when-disabled` could hold `color-orange` which would constitue a decision.

## 1.2. Choices

The following choices are available in our design system:

- [Colors](#)
- [Spacings](#)
- [Font Sizes](#)
- ?

## 1.3. Design Tokens

Check out the story in [Storybook](#) to see our design tokens.

## 1.4. Design Tokens limit choices by making desicions

These general choices are narrowed down by design tokens. Design Tokens
limit the choices we offer for certain properties by deciding which use for specific groups.

### 1.4.1. Example for colors

An example for this is our color palette: The system offers a range of colors:

```
# Choices (not design tokens)
color-black
color-grey
color-orange
color-red
color-green
color-purple
```

These colors are then narrowed down by design tokens into
specific groups like font-colors, background-colors and border-colors. This
helps to limit the choices when it comes to certain properties:

```
--token-background-color-for-input: color-grey
--token-background-color-for-input: color-grey
--token-font-color-for-input: color-black
--token-font-color-for-input-when-disabled: color-grey
```

For example, we made the **decision** to use the **choice** `color-grey` for our **token** `--token-background-color-for-input`.

| Token                                | Choice       | Decision                                         |
| ------------------------------------ | ------------ | ------------------------------------------------ |
| `--token-background-color-for-input` | `color-grey` | `--token-background-color-for-input: color-grey` |

### 1.4.2. Example for font-sizes

Another example are the font-sizes: The system offers a range of font-sizes like

```
# Choices (not design tokens)
font-size-xs
font-size-s
font-size-m
font-size-l
font-size-xl
```

These get narrowed down by semantic design tokens

```
# Semantic tokens
# Notice that the selection is gone (no "xs", "m" etc) because we made a decision
--token-font-size-for-input
--token-font-size-for-headline
```

`--token-font-size-for-input` could then hold `font-size-m` for example. This is
a decision. Making decisions at the design stage reduces the amount of choices
designers need to make when using the design system. We already made the decision
of which font-size to use for inputs, so nobody else will need to worry about it.

_This short [article](https://techpinions.com/snippet-design-is-the-difference-between-choice-and-decision/32765) explains Choices and Decisions extremely nicely without talking about design systems at all._

## 1.5. Token Structure

Our design tokens aim to be human-readable and easy to comprehend. We settled on
a format which contains separator words (`for`, `when` and `on`) to help distinguish
the different aspects of a design token.

<img src="https://pbs.twimg.com/media/DsD1XN-XgAAb9lx.jpg" alt="token-structure" width="552" />

## 1.6. Aspects

We start with specifying generic design tokens for a **property** like

```
--token-font-color
```

More specific token can be introduced

...for specific **component group**s:

```
--token-font-color-for-input
```

...or for a specific **state**

```
--token-font-color-when-disabled
```

...or for a specific **modifier**

```
--token-font-color-on-dark
```

This leads us to four different aspects of a design token:

- Property
- Component Group
- State
- Modifier

### 1.6.1. Aspect: Property

The property defines which visual attribute the design token influences.

Examples are: `font-color`, `background-color`, `border-color`, `border-radius`, `font-size`.

### 1.6.2. Aspect: Component Group

The Component Group limits the choices to a certain type of component. We identified the following component groups:

- `button`: Clickable elements which trigger an action
- `panel`: Visual grouping
- `dropdown`: Elements which offer more choices in an appearing menu
- `label`: Elements which give meaning to another element and focus the related element when clicked
- `icon`: Icons
- `input`: Elements which get information from the user
- `stamp`: Indicate additional information about an element
- `checkbox`: Elements which allow users to select a subset from a list of options
- `radio`: Elements which allow users to select one option from a list
- `toggle`: Elements which allow users to select a boolean option
- `tag`: Elements which indicate one item of a selection
- `text-headline`: Headline
- `text-subheadline`: Subheadline
- `text-body`: Body Text
- `text-detail`: Detail Text

### 1.6.3. Aspect: State

States are not exlcusive. An element can be in multiple states at the same time.

We identified the following states:

| State       | Maps to CSS pseudo class | Description                                                                                           |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `visited`   | `:visited`               |  The user has visited this link before                                                                |
| `hovered`   | `:hover`                 |  The pointer is over this element                                                                     |
| `active`    | `:active`                |  The element is currently being activated by the user                                                 |
| `focused`   | `:focus`                 | The element is currently selected to receive input                                                    |
| `disabled`  | `:disabled`              | The element can not be interacted with                                                                |
| `read-only` | `:read-only`             | The element can not be modified                                                                       |
| `checked`   | `:checked`               | Checkboxes, Radios, Toggles                                                                           |  | The element is checked by the user. |
| `warning`   | -                        | The element contains a warning. Warnings do not block the further flow but should be resolved.        |
| `error`     | -                        | The element contains an error. Errors block the further flow and must be resolved.                    |
| `info`      | -                        | The element contains a hint. Hints do not block the further flow and need do not need to be resolved. |

#### 1.6.3.1. `active` vs `focused`

`focused` and `active` are two different states.

`focused` represents the state when the element is currently selected to receive input and `active` represents the state when the element is currently being activated by the user.

For example let's say we have a `<button>`. The `<button>` will not have any state to begin with. It just exists. If we use <kbd>Tab</kbd> to give "focus" to the `<button>`, it now enters its `focused` state. If you then click (or press <kbd>Space</kbd>), you then make the button enter its `active` state.

On that note, when you click on an element, you give it focus, which also cultivates the illusion that `focused` and `active` are the same. They are not the same. When clicked, the button is in `focused` and `active` state.

In other words: An element in `active` state must also be in the `focused` state, but not all `focused` elements are in an `active` state.

_This explanation was taken from https://stackoverflow.com/a/1678020 and modified slightly._

### 1.6.4. Aspect: Modifier

Some elements need to look different in certain situations. Modifers allow to
represent that information in the design token.

#### 1.6.4.1. `on-dark`

Usually a light background is assumed for elements. We use `on-dark` to allow using a different value in situations where the component needs to be used on a dark background.
