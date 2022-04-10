/**
 * @jest-environment jsdom
*/

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import React from 'react';
import { TextField } from '@shopify/polaris';
import { mount } from 'enzyme';

import './utils/matchMedia.mock';
import FAQindex from '../pages/FAQindex';

configure({adapter: new Adapter()});
let wrapper = mount(<FAQindex />);

it('Mount FAQindex react component.', () => {
    expect(wrapper.exists()).toBe(true);
});

it('Render Polaris Textfield element', () => {
    expect(wrapper.find(TextField).exists()).toBe(true);
});
