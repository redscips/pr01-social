// src/@types/react-to-webcomponent.d.ts
declare module 'react-to-webcomponent' {
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';

  /**
   * Converte um componente React para um Web Component.
   * @param component Componente React
   * @param React Referência à biblioteca React
   * @param ReactDOM Referência à biblioteca ReactDOM
   */
  export default function reactToWebComponent(
    component: React.ComponentType<any>,
    React: typeof React,
    ReactDOM: typeof ReactDOM
  ): CustomElementConstructor;
}
