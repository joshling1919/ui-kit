import PropTypes from 'prop-types';
import React from 'react';
import requiredIf from 'react-required-if';
import IconButton from '../buttons/icon-button';
import { InformationIcon } from '../icons';
import Text from '../typography/text';
import Label from '../label';
import Spacings from '../materials/spacings';
import styles from './field-label.mod.css';

export const FieldLabel = props => (
  <React.Fragment>
    <div className={styles.label}>
      <Spacings.Inline alignItems="flexStart" scale="xs">
        <Text.Wrap>
          <Label
            isBold={true}
            isRequiredIndicatorVisible={props.hasRequiredIndicator}
            htmlFor={props.htmlFor}
          >
            {props.title}
          </Label>
        </Text.Wrap>
        {props.onInfoButtonClick && (
          <IconButton
            icon={<InformationIcon size="medium" />}
            size="small"
            onClick={props.onInfoButtonClick}
          />
        )}
      </Spacings.Inline>
    </div>

    {(props.hint || props.hintIcon) && (
      <div className={styles.hint}>
        <Spacings.Inline alignItems="flexStart" scale="xs">
          {props.hintIcon && (
            <span className={styles.hintIcon}>
              {// FIXME: add proper tone when tones are refactored
              React.cloneElement(props.hintIcon, {
                size: 'medium',
                theme: 'orange',
              })}
            </span>
          )}
          {props.hint && <Text.Detail>{props.hint}</Text.Detail>}
        </Spacings.Inline>
      </div>
    )}
    {props.description && (
      <div className={styles.description}>
        <Text.Detail>
          <Text.Wrap>{props.description}</Text.Wrap>
        </Text.Detail>
      </div>
    )}

    {props.badge && (
      <div className={styles.badge}>
        <div className={styles['label-badge']}>{props.badge}</div>
      </div>
    )}
  </React.Fragment>
);

FieldLabel.displayName = 'FieldLabel';
FieldLabel.defaultProps = {
  hasRequiredIndicator: false,
  isBold: false,
};
FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  hint: requiredIf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    props => props.hintIcon
  ),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onInfoButtonClick: PropTypes.function,
  hintIcon: PropTypes.node,
  badge: PropTypes.node,
  hasRequiredIndicator: PropTypes.bool,
  htmlFor: PropTypes.string,
};

export default FieldLabel;