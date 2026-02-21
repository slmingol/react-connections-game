import React from 'react';
import WordButton from './WordButton';
import { GameStatusContext } from '../../providers/GameStatusProvider';

export default {
  title: 'Game/WordButton',
  component: WordButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const [guessCandidate, setGuessCandidate] = React.useState([]);
      return (
        <GameStatusContext.Provider value={{ guessCandidate, setGuessCandidate }}>
          <Story />
        </GameStatusContext.Provider>
      );
    },
  ],
  argTypes: {
    word: {
      control: 'text',
      description: 'The word displayed on the button',
    },
    fullCandidateSize: {
      control: 'number',
      description: 'Maximum number of words that can be selected',
      defaultValue: 4,
    },
  },
};

export const Default = {
  args: {
    word: 'CONNECT',
    fullCandidateSize: 4,
  },
};

export const ShortWord = {
  args: {
    word: 'CAT',
    fullCandidateSize: 4,
  },
};

export const LongWord = {
  args: {
    word: 'EXTRAORDINARY',
    fullCandidateSize: 4,
  },
};

export const VeryLongWord = {
  args: {
    word: 'ANTIDISESTABLISHMENTARIANISM',
    fullCandidateSize: 4,
  },
};

export const Interactive = {
  args: {
    word: 'INTERACTIVE',
    fullCandidateSize: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the button to select/deselect words. Try adding multiple words!',
      },
    },
  },
  decorators: [
    (Story) => {
      const [guessCandidate, setGuessCandidate] = React.useState([]);
      return (
        <GameStatusContext.Provider value={{ guessCandidate, setGuessCandidate }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              <WordButton word="FIRST" fullCandidateSize={4} />
              <WordButton word="SECOND" fullCandidateSize={4} />
              <WordButton word="THIRD" fullCandidateSize={4} />
              <WordButton word="FOURTH" fullCandidateSize={4} />
            </div>
            <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
              <strong>Selected:</strong> {guessCandidate.length > 0 ? guessCandidate.join(', ') : 'None'}
            </div>
          </div>
        </GameStatusContext.Provider>
      );
    },
  ],
};
