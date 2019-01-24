import React from 'react';
import { render } from 'react-dom';
import App from './components/app/app';
import './sass/main.scss';

function component() {
  const element = document.createElement('div');
  element.id = 'app'
  return element;
}

document.body.appendChild(component());

render(
  <App />, document.getElementById('app')
);
