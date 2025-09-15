import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LazyImage from '../components/LazyImage';

describe('LazyImage', () => {
  test('renders wrapper and image with alt', () => {
    render(<LazyImage src="https://example.com/x.jpg" alt="Alt text" />);
    // image exists with alt text, may not have src until visible
    const img = screen.getByAltText('Alt text');
    expect(img).toBeInTheDocument();
  });
});
