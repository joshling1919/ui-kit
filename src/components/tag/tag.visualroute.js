import React from 'react';
import { Tag } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
metus ultrices, interdum augue eget, consequat orci. Nam et nisi
eleifend, fermentum nunc non, sagittis tortor. Pellentesque vulputate
dignissim leo fermentum vehicula. Fusce efficitur est molestie augue
ullamcorper dictum. Donec non leo a augue dictum pretium. Praesent ac
quam pharetra, posuere mauris in, pharetra nisi.`;

export const routePath = '/tag';

class Component extends React.Component {
  state = {
    showRemovableTag: true,
  };

  onToggle = () => {
    this.setState(prevState => ({
      showRemovableTag: !prevState.showRemovableTag,
    }));
  };
  render() {
    return (
      <Suite>
        <Spec label="Normal">
          <Tag type="normal">Tag</Tag>
        </Spec>
        {this.state.showRemovableTag && (
          <Spec label="Normal - onRemove">
            <Tag
              type="normal"
              onRemove={this.onToggle}
              data-testid="removable-tag"
            >
              With remove
            </Tag>
          </Spec>
        )}
        <Spec label="Normal - horizontalConstraint - xs">
          <Tag type="normal" horizontalConstraint="xs">
            Tag
          </Tag>
        </Spec>
        <Spec label="Normal - horizontalConstraint - s">
          <Tag type="normal" horizontalConstraint="s">
            Tag
          </Tag>
        </Spec>
        <Spec label="Normal - horizontalConstraint - m">
          <Tag type="normal" horizontalConstraint="m">
            Tag
          </Tag>
        </Spec>
        <Spec label="Normal - horizontalConstraint - l">
          <Tag type="normal" horizontalConstraint="l">
            Tag
          </Tag>
        </Spec>
        <Spec label="Normal - horizontalConstraint - xl">
          <Tag type="normal" horizontalConstraint="xl">
            Tag
          </Tag>
        </Spec>

        <Spec label="Warning">
          <Tag type="warning">Warning message</Tag>
        </Spec>
        <Spec label="Warning - disabled">
          <Tag type="warning" isDisabled={true}>
            Warning but disabled
          </Tag>
        </Spec>
        <Spec label="Normal - multiple lines of text">
          <Tag type="normal">{longText}</Tag>
        </Spec>
        <Spec label="Normal - multiple lines of text - onRemove">
          <Tag type="normal" onRemove={() => {}}>
            {longText}
          </Tag>
        </Spec>
      </Suite>
    );
  }
}

export const component = Component;