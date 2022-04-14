/**
 * @jest-environment jsdom
*/

import renderer from 'react-test-renderer';
import SelectOptions from '../SelectOptions';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import './mocks/matchMedia.mock';


describe('<SelectOptions />', () => {
    
    it('In development...', () => {
        expect(true).toBe(true);
    });
    /*it('Create snapshot of the SelectOptions react component.', () => {
        const tree = renderer
            .create(<AppProvider><SelectOptions /></AppProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });*/
});