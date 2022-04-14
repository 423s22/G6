/**
 * @jest-environment jsdom
*/

import renderer from 'react-test-renderer';
import SuccessToast from '../SuccessToast';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import './mocks/matchMedia.mock';


describe('<SuccessToast />', () => {
    
    it('Create snapshot of the SuccessToast react component.', () => {
        const tree = renderer
            .create(<AppProvider><SuccessToast /></AppProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});