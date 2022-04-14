/**
 * @jest-environment jsdom
*/

import renderer from 'react-test-renderer';
import DropdownForm from '../DropdownForm';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import './mocks/matchMedia.mock';


describe('<DropdownForm />', () => {
    
    it('Create snapshot of the DropdownForm react component.', () => {
        const tree = renderer
            .create(<AppProvider><DropdownForm /></AppProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});