import React from 'react';
import { shallow } from 'enzyme';
import LocalizedTextInput from './localized-text-input';

const createTestProps = custom => ({
  value: { en: 'Horse', de: 'Pferd' },
  onChange: jest.fn(),
  selectedLanguage: 'en',
  ...custom,
});

describe('rendering', () => {
  let wrapper;
  let props;
  describe('with minimal props', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when collapsed', () => {
    describe('with id', () => {
      beforeEach(() => {
        props = createTestProps({ id: 'foo' });
        wrapper = shallow(<LocalizedTextInput {...props} />);
      });
      it('should add a language suffix to the id of each visible input', () => {
        // only the first language input is visible here
        expect(wrapper).toRender({ id: 'foo-en' });
      });
    });
    describe('with name', () => {
      beforeEach(() => {
        props = createTestProps({ name: 'foo' });
        wrapper = shallow(<LocalizedTextInput {...props} />);
      });
      it('should forward the name', () => {
        // only the first language input is visible here
        expect(wrapper).toRender({ name: 'foo' });
      });
    });
  });

  describe('when expanded by default', () => {
    beforeEach(() => {
      props = createTestProps({ isDefaultExpanded: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when expansion toggle feature is disabled', () => {
    beforeEach(() => {
      props = createTestProps({ hideExpansionControls: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when autofocus is activated', () => {
    beforeEach(() => {
      props = createTestProps({ isAutofocussed: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in read-only mode', () => {
    beforeEach(() => {
      props = createTestProps({ isReadOnly: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when placeholders are provided', () => {
    beforeEach(() => {
      props = createTestProps({ placeholder: { en: 'Value', de: 'Wert' } });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when horizontal size is set', () => {
    beforeEach(() => {
      props = createTestProps({ horizontalConstraint: 's' });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      props = createTestProps({ error: { missing: true } });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
