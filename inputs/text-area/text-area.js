import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { injectIntl } from 'react-intl';
import { filterDataAttributes } from '@commercetools-local/utils/dataset';
import Collapsible from '@commercetools-local/ui-kit/collapsible';
import TextareaAutosize from 'react-textarea-autosize';
import FlatButton from '@commercetools-local/ui-kit/buttons/flat-button';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-local/ui-kit/icons';
import Constraints from '../../materials/constraints';
import styles from './text-area.mod.css';
import messages from './messages';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getStyles = ({ isDisabled, hasError, hasWarning, isReadOnly }) => {
  if (isDisabled) return styles.disabled;
  if (hasError) return styles.error;
  if (hasWarning) return styles.warning;
  if (isReadOnly) return styles.readonly;

  return styles.pristine;
};

export class TextArea extends React.Component {
  static displayName = 'TextArea';

  // The minimum ammount of rows the TextArea will show.
  // When the input is closed, this is used as the maximum row count as well
  // so that the input "collapses".
  static MIN_ROW_COUNT = 1;

  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isAutofocussed: PropTypes.bool,
    isDefaultClosed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),

    // HoC
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    onFocus: () => {},
    hasError: false,
    hasWarning: false,
  };

  state = {
    numOfRows: TextArea.MIN_ROW_COUNT,
  };

  handleHeightChange = (_, innerComponent) => {
    this.setState({
      numOfRows: innerComponent.rowCount,
    });
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Collapsible isDefaultClosed={this.props.isDefaultClosed}>
          {({ isOpen, toggle }) => (
            <React.Fragment key="textarea-autosize">
              <TextareaAutosize
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                onHeightChange={this.handleHeightChange}
                id={this.props.id}
                onBlur={this.props.onBlur}
                onFocus={() => {
                  if (!isOpen) toggle();
                  this.props.onFocus();
                }}
                disabled={this.props.isDisabled}
                placeholder={this.props.placeholder}
                className={getStyles({
                  isDisabled: this.props.isDisabled,
                  hasError: this.props.hasError,
                  hasWarning: this.props.hasWarning,
                  isReadOnly: this.props.isReadOnly,
                })}
                readOnly={this.props.isReadOnly}
                autoFocus={this.props.isAutofocussed}
                /* ARIA */
                aria-readonly={this.props.isReadOnly}
                aria-multiline="true"
                role="textbox"
                minRows={TextArea.MIN_ROW_COUNT}
                maxRows={!isOpen ? TextArea.MIN_ROW_COUNT : undefined}
                useCacheForDOMMeasurements={true}
                {...filterDataAttributes(this.props)}
              />
              {(this.state.numOfRows > TextArea.MIN_ROW_COUNT || !isOpen) && (
                <FlatButton
                  onClick={toggle}
                  type="primary"
                  isDisabled={this.props.isDisabled}
                  label={this.props.intl.formatMessage(
                    messages[isOpen ? 'collapse' : 'expand']
                  )}
                  icon={
                    !isOpen ? (
                      <AngleDownIcon size="small" />
                    ) : (
                      <AngleUpIcon size="small" />
                    )
                  }
                />
              )}
            </React.Fragment>
          )}
        </Collapsible>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(TextArea);