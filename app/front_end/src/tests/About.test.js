import React from 'react';
import { render } from '@testing-library/react';
import About from '../views/About.jsx';

test('Test About Loading', () => {

    const { getByText } = render(<About />);
    const textElement = getByText('Credit');
    expect(textElement).toBeInTheDocument();
});

