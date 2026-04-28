import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('Navigation', () => {
  it('renders all menu items', () => {
    render(<App />);
    expect(screen.getAllByText('All Cars').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Add Car')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders the app logo', () => {
    render(<App />);
    expect(screen.getByText('FLEET')).toBeInTheDocument();
  });
});

describe('All Cars Page', () => {
  it('displays initial sample cars', async () => {
    render(<App />);
    expect(await screen.findByText('Camry 2023')).toBeInTheDocument();
    expect(await screen.findByText('Hilux 2022')).toBeInTheDocument();
    expect(await screen.findByText('Patrol 2024')).toBeInTheDocument();
    expect(await screen.findByText('Accent 2021')).toBeInTheDocument();
  });

  it('shows column headers in the table', async () => {
    render(<App />);
    await screen.findByText('Camry 2023');
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('displays status badges', async () => {
    render(<App />);
    await screen.findByText('Camry 2023');
    expect(screen.getAllByText('Active').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Under Maintenance')).toBeInTheDocument();
  });
});

describe('Add Car', () => {
  it('navigates to Add Car page', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add Car'));
    expect(screen.getByText('Add New Car')).toBeInTheDocument();
  });

  it('shows the add form with required fields', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add Car'));
    expect(screen.getByPlaceholderText('e.g. Camry 2024')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. Toyota')).toBeInTheDocument();
  });

  it('shows error when required fields are empty', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add Car'));
    fireEvent.click(screen.getByText('+ Add Car'));
    expect(screen.getByText('Name and Company are required.')).toBeInTheDocument();
  });

  it('adds a new car successfully', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add Car'));

    fireEvent.change(screen.getByPlaceholderText('e.g. Camry 2024'), {
      target: { name: 'name', value: 'Sonata 2025' },
    });
    fireEvent.change(screen.getByPlaceholderText('e.g. Toyota'), {
      target: { name: 'company', value: 'Hyundai' },
    });
    fireEvent.click(screen.getByText('+ Add Car'));

    expect(await screen.findByText('Car added successfully!')).toBeInTheDocument();
  });
});

describe('Edit Car', () => {
  it('opens edit form when Edit is clicked', async () => {
    render(<App />);
    await screen.findByText('Camry 2023');
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    expect(screen.getByText(/Edit Car/)).toBeInTheDocument();
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('cancel returns to list', async () => {
    render(<App />);
    await screen.findByText('Camry 2023');
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getAllByText('All Cars').length).toBeGreaterThanOrEqual(2);
  });
});

describe('Delete Car', () => {
  it('deletes a car and shows confirmation', async () => {
    render(<App />);
    await screen.findByText('Camry 2023');
    const deleteButtons = screen.getAllByText('Delete');
    const initialCount = deleteButtons.length;
    fireEvent.click(deleteButtons[0]);
    expect(await screen.findByText('Car deleted.')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByText('Delete').length).toBe(initialCount - 1);
    });
  });
});

describe('Search', () => {
  it('navigates to Search page', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Search'));
    expect(screen.getByText('Search Car by ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter car ID')).toBeInTheDocument();
  });

  it('finds an existing car by ID', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Search'));
    fireEvent.change(screen.getByPlaceholderText('Enter car ID'), {
      target: { value: '1' },
    });
    const searchButtons = screen.getAllByText('Search');
    fireEvent.click(searchButtons[searchButtons.length - 1]);
    expect(await screen.findByText('Camry 2023')).toBeInTheDocument();
    expect(screen.getByText('Toyota')).toBeInTheDocument();
  });

  it('shows error for non-existent ID', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Search'));
    fireEvent.change(screen.getByPlaceholderText('Enter car ID'), {
      target: { value: '999' },
    });
    const searchButtons = screen.getAllByText('Search');
    fireEvent.click(searchButtons[searchButtons.length - 1]);
    expect(await screen.findByText('No car found with ID 999')).toBeInTheDocument();
  });

  it('shows error for invalid input', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Search'));
    fireEvent.change(screen.getByPlaceholderText('Enter car ID'), {
      target: { value: 'abc' },
    });
    const searchButtons = screen.getAllByText('Search');
    fireEvent.click(searchButtons[searchButtons.length - 1]);
    expect(screen.getByText('Please enter a valid numeric ID.')).toBeInTheDocument();
  });
});

describe('About Page', () => {
  it('displays team member information', () => {
    render(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('Hamad Alsoqaih')).toBeInTheDocument();
    expect(screen.getByText('Faisal Alojaimi')).toBeInTheDocument();
    expect(screen.getByText('Abdulaziz Aldhamri')).toBeInTheDocument();
  });

  it('displays student IDs', () => {
    render(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('ID: 221211442')).toBeInTheDocument();
    expect(screen.getByText('ID: 222110815')).toBeInTheDocument();
    expect(screen.getByText('ID: 221211406')).toBeInTheDocument();
  });

  it('displays project info', () => {
    render(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('SE411 Project · Spring 2025-26')).toBeInTheDocument();
  });
});
