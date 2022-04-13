/**
 * @jest-environment jsdom
*/

import renderer from 'react-test-renderer';
import AddOptions from '../../components/AddOptions';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import './mocks/matchMedia.mock';


describe('<AddOptions />', () => {
    
    it('Create snapshot of the AddOptions react component.', () => {
        const tree = renderer
            .create(<AppProvider><AddOptions /></AppProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
