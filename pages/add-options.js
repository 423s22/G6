import React from 'react';
import {Page, Layout, EmptyState, Banner} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Router from 'next/router';
import ProductCard from '../components/ProductCard';
import AddOptions from '../components/AddOptions';
import styles from '../css/add-options.module.css';
import { useProductContext } from '../context/ProductContext';
import SelectOptions from '../components/SelectOptions';

class CustomOptions extends React.Component {

  render() {
    return (
      <SelectOptions />

    );
  }
}

export default CustomOptions;

