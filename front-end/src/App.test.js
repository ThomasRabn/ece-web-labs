import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ContextProvider } from './Context';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <React.StrictMode>
      <ContextProvider>
        <Router>
          <App />
        </Router>
      </ContextProvider>
    </React.StrictMode>
  );
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
