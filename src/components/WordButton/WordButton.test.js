import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordButton from './WordButton';
import { GameStatusContext } from '../../providers/GameStatusProvider';

describe('WordButton', () => {
  const mockSetGuessCandidate = vi.fn();

  beforeEach(() => {
    mockSetGuessCandidate.mockClear();
  });

  const renderWithContext = (word, guessCandidate = []) => {
    const contextValue = {
      guessCandidate,
      setGuessCandidate: mockSetGuessCandidate,
    };

    return render(
      <GameStatusContext.Provider value={contextValue}>
        <WordButton word={word} fullCandidateSize={4} />
      </GameStatusContext.Provider>
    );
  };

  it('renders the word button', () => {
    renderWithContext('TEST');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('adds word to candidate when clicked and not selected', async () => {
    const user = userEvent.setup();
    renderWithContext('WORD', []);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockSetGuessCandidate).toHaveBeenCalledWith(['WORD']);
  });

  it('removes word from candidate when clicked and selected', async () => {
    const user = userEvent.setup();
    renderWithContext('WORD', ['WORD', 'OTHER']);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockSetGuessCandidate).toHaveBeenCalledWith(['OTHER']);
  });

  it('does not add word when candidate list is full', async () => {
    const user = userEvent.setup();
    renderWithContext('FIFTH', ['ONE', 'TWO', 'THREE', 'FOUR']);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockSetGuessCandidate).not.toHaveBeenCalled();
  });
});
