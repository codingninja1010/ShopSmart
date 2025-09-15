import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortSelect from 'src/components/SortSelect';

describe('SortSelect', () => {
  test('toggles menu and selects option', async () => {
    const onChange = jest.fn();
    render(<SortSelect value="relevance" onChange={onChange} />);
    const button = screen.getByRole('button', { name: /sort products/i });
    await userEvent.click(button);
    const option = screen.getByRole('option', { name: /price: low to high/i });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('price-asc');
  });
});
