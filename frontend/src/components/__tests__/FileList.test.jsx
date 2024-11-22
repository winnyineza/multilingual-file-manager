import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import FileList from '../FileList.jsx';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str,
  }),
}));

describe('FileList', () => {
  const mockFiles = [
    {
      id: 1,
      name: 'test-file.txt',
      modifiedAt: '2024-01-20T10:00:00Z',
    },
    {
      id: 2,
      name: 'another-file.pdf',
      modifiedAt: '2024-01-21T11:00:00Z',
    },
  ];

  it('renders empty state when no files are provided', () => {
    render(<FileList files={[]} />);
    expect(screen.getByText('noFiles')).toBeInTheDocument();
  });

  it('renders list of files when provided', () => {
    render(<FileList files={mockFiles} />);
    expect(screen.getByText('test-file.txt')).toBeInTheDocument();
    expect(screen.getByText('another-file.pdf')).toBeInTheDocument();
  });

  it('calls onFileSelect when a file is clicked', () => {
    const onFileSelect = vi.fn();
    render(<FileList files={mockFiles} onFileSelect={onFileSelect} />);
    
    fireEvent.click(screen.getByText('test-file.txt'));
    expect(onFileSelect).toHaveBeenCalledWith(mockFiles[0]);
  });
});