/**
 * @jest-environment jsdom
*/

import renderer from 'react-test-renderer';
import EngravingForm from '../EngravingForm';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import './mocks/matchMedia.mock';


describe('<EngravingForm />', () => {
    
    it('Create snapshot of the EngravingForm react component.', () => {
        const tree = renderer
            .create(<AppProvider><EngravingForm /></AppProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});