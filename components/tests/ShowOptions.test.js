/**
 * @jest-environment jsdom
*/

import renderer from 'react-test-renderer';
import ShowOptions from '../ShowOptions';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import './mocks/matchMedia.mock';


describe('<ShowOptions />', () => {
    
    it('Create snapshot of the ShowOptions react component.', () => {
        const tree = renderer
            .create(<AppProvider><ShowOptions /></AppProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});