import invariant from 'tiny-invariant';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const buttonSizes = {
  small: '14px',
  medium: '22px',
  big: '30px',
};

const getStateStyles = (isDisabled, isActive, theme) => {
  if (isDisabled) {
    const disabledStyle = css`
      background-color: ${vars.colorAccent98};
      border-color: ${vars.colorNeutral};
      color: ${vars.colorNeutral60};
      box-shadow: none;
    `;
    switch (theme) {
      case 'blue':
        return [
          disabledStyle,
          css`
            &:hover {
              border-color: ${vars.colorInfo85};
              background-color: ${vars.colorInfo85};
            }
          `,
        ];
      case 'green':
        return [
          disabledStyle,
          css`
            &:hover {
              border-color: ${vars.colorPrimary85};
              background-color: ${vars.colorPrimary85};
            }
          `,
        ];
      default:
        return disabledStyle;
    }
  }
  if (isActive) {
    const activeStyle = css`
      box-shadow: ${vars.shadow9};
      background-color: ${vars.colorSurface};
      border-color: ${vars.colorSurface};
      &:hover {
        box-shadow: ${vars.shadow9};
        background-color: ${vars.colorNeutral95};
        border-color: ${vars.colorNeutral95};
      }
    `;
    switch (theme) {
      case 'blue':
        return [
          activeStyle,
          css`
            ${
              // When the button is active and somehow is disabled it should have
              // a different color to indicate that it's active but can't receive any actions
              isDisabled
                ? `
                  background-color: ${vars.colorInfo85};
                  border-color: ${vars.colorInfo85};
                  color: ${vars.colorSurface};
                  box-shadow: ${vars.shadow9};
                `
                : ''
            }
            background-color: ${vars.colorInfo};
            border-color: ${vars.colorInfo};
            color: ${vars.colorSurface};
            &:hover {
              background-color: ${vars.colorInfo85};
              border-color: ${vars.colorInfo85};
            }
          `,
        ];
      case 'green':
        return [
          activeStyle,
          css`
            ${
              // When the button is active and somehow is disabled it should have
              // a different color to indicate that it's active but can't receive any actions
              isDisabled
                ? `
                  background-color: ${vars.colorPrimary85};
                  border-color: ${vars.colorPrimary85};
                  color: ${vars.colorSurface};
                  box-shadow: ${vars.shadow9};
                `
                : ''
            }
            background-color: ${vars.colorPrimary};
            color: ${vars.colorSurface};
            &:hover {
              background-color: ${vars.colorPrimary85};
              border-color: ${vars.colorPrimary85};
            }
          `,
        ];
      default:
        return activeStyle;
    }
  }
  return css`
    &:hover {
      box-shadow: ${vars.shadow8};
    }
    &:active {
      box-shadow: ${vars.shadow9};
      background-color: ${vars.colorSurface};
      border-color: ${vars.colorSurface};
    }
  `;
};

const getShapeStyles = (shape, size) => {
  switch (shape) {
    case 'round':
      return css`
        border-radius: 50%;
      `;
    case 'square':
      switch (size) {
        case 'small':
          return css`
            border-radius: ${vars.borderRadius2};
          `;
        case 'medium':
          return css`
            border-radius: ${vars.borderRadius4};
          `;
        case 'big':
          return css`
            border-radius: ${vars.borderRadius6};
          `;
        default:
          return css``;
      }
    default:
      return css``;
  }
};
const getSizeStyles = size => {
  switch (size) {
    case 'small':
      return css`
        height: ${buttonSizes.small};
        width: ${buttonSizes.small};
      `;
    case 'medium':
      return css`
        height: ${buttonSizes.medium};
        width: ${buttonSizes.medium};
      `;
    case 'big':
      return css`
        height: ${buttonSizes.big};
        width: ${buttonSizes.big};
      `;
    default:
      return css``;
  }
};
const getThemeStyles = theme => {
  if (!theme) return css``;

  if (theme === 'default') return css``;

  switch (theme) {
    case 'green':
      return css`
        &:active {
          background-color: ${vars.colorPrimary};
          border-color: ${vars.colorPrimary};
          color: ${vars.colorSurface};
        }
      `;
    case 'blue':
      return css`
        &:hover {
          background-color: ${vars.colorInfo};
          border-color: ${vars.colorInfo};
          color: ${vars.colorSurface};
        }
      `;
    default: {
      invariant(
        false,
        `ui-kit/IconButton: the specified theme '${theme}' is not supported.`
      );
      return css``;
    }
  }
};

export { getStateStyles, getShapeStyles, getSizeStyles, getThemeStyles };
