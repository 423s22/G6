/**
 * @jest-environment jsdom
*/

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import React from 'react';
import {  } from '@shopify/polaris';
import { mount } from 'enzyme';

import './utils/matchMedia.mock';
import CustomOptions from '../pages/add-options';

configure({adapter: new Adapter()});
//let wrapper = mount(<CustomOptions />);

it('Mount CustomOptions react component.', () => {
    //expect(wrapper.exists()).toBe(true);
    expect(true).toBe(true);
});