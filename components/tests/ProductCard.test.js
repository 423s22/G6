/**
 * @jest-environment jsdom
*/

import renderer from 'react-test-renderer';
import ProductCard from '../ProductCard';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import './mocks/matchMedia.mock';


describe('<ProductCard />', () => {
    
    it('In development...', () => {
        expect(true).toBe(true);
    });
    /*it('Create snapshot of the ProductCard react component.', () => {
        const tree = renderer
            .create(<AppProvider><ProductCard /></AppProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });*/
});