/**
 * @jest-environment jsdom
*/

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import React from 'react';
import { Page, Layout, EmptyState } from '@shopify/polaris';
import { mount } from 'enzyme';

import './utils/matchMedia.mock';
import Index from '../pages/index';

configure({adapter: new Adapter()});
let wrapper = mount(<Index />);

it('Mount Index react component.', () => {
    expect(wrapper.exists()).toBe(true);
});

it('Render Polaris Page element.', () => {
    expect(wrapper.find(Page).exists()).toBe(true);
});

it('Render Polaris Layout element.', () => {
    expect(wrapper.find(Layout).exists()).toBe(true);
});

it('Render Polaris EmptyState element.', () => {
    expect(wrapper.find(EmptyState).exists()).toBe(true);
});
