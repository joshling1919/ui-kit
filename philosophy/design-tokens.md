# Design Tokens

> This document is WIP and subject to change as we learn more about design tokens.

We use design tokens as the smallest form of information in our visual language.
The tokens give semantic meaning to the plain palette of options we have.

## Choices

The following choices are available in our design system:

- [Colors](#)
- [Spacings](#)
- [Font Sizes](#)
- ?

## Design Tokens limit choices

These general choices are narrowed down by design tokens. Design Tokens
limit the choices we offer for certain properties by grouping the tokens.

An example for this is our color palette: The system offers a range of colors
(e.g. `color-orange`). These colors are then narrowed down by design tokens into
specific groups like font-colors, background-colors and border-colors. This
helps to limit the choices when it comes to certain properties.

Another example are the font-sizes: The system offers a range of font-sizes like

```
font-size-xs
font-size-s
font-size-m
font-size-l
font-size-xl
```

These get narrowed down by semantic design tokens

```
--token-font-size-for-input
--token-font-size-for-headline
```

## Token Structure

Our design tokens aim to be human-readable and easy to comprehend. We settled on
a format which contains separator words (`for`, `when` and `on`) to help distinguish
the different aspects of a design token.

<img src="https://pbs.twimg.com/media/DsD1XN-XgAAb9lx.jpg" alt="token-structure" width="552" />

## Aspects

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

### Aspect: Property

The property defines which visual attribute the design token influences.

Examples are: `font-color`, `background-color`, `border-color`, `border-radius`, `font-size`.

### Aspect: Component Group

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

### Aspect: State

States are not exlcusive. An element can be in multiple states at the same time.

We identified the following states:

| State       | Usually seen on | Description                                                                                           |
| ----------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| `visited`   | Links           |  The user has visited this link before                                                                |
| `hovered`   |                 |  The pointer is over this element                                                                     |
| `active`    |                 |  The element is currently being activated by the user                                                 |
| `focused`   |                 | The element is currently selected to receive input                                                    |
| `disabled`  |                 | The element can not be interacted with                                                                |
| `read-only` |                 | The element can not be modified                                                                       |
| `warning`   |                 | The element contains a warning. Warnings do not block the further flow but should be resolved.        |
| `error`     |                 | The element contains an error. Errors block the further flow and must be resolved.                    |
| `info`      |                 | The element contains a hint. Hints do not block the further flow and need do not need to be resolved. |
| `checked`   |                 | Checkboxes, Radios, Toggles                                                                           |  | The element is checked by the user. |

#### `active` vs `focused`

`focused` and `active` are two different states.

`focused` represents the state when the element is currently selected to receive input and `active` represents the state when the element is currently being activated by the user.

For example let's say we have a `<button>`. The `<button>` will not have any state to begin with. It just exists. If we use <kbd>Tab</kbd> to give "focus" to the `<button>`, it now enters its `focused` state. If you then click (or press <kbd>Space</kbd>), you then make the button enter its `active` state.

On that note, when you click on an element, you give it focus, which also cultivates the illusion that `focused` and `active` are the same. They are not the same. When clicked, the button is in `focused` and `active` state.

In other words: An element in `active` state must also be in the `focused` state, but not all `focused` elements are in an `active` state.

_This explanation was taken from https://stackoverflow.com/a/1678020 and modified slightly._

### Aspect: Modifier

Some elements need to look different in certain situations. Modifers allow to
represent that information in the design token.

#### `on-dark`

Usually a light background is assumed for elements. We use `on-dark` to allow using a different value in situations where the component needs to be used on a dark background.
