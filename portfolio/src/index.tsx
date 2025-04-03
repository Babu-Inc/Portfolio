import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/animations.css';
import './styles/space-animation.css';
import App from './App.tsx';
import { AnimationProvider } from './components/AnimationProvider.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AnimationProvider>
      <App />
    </AnimationProvider>
  </React.StrictMode>
);