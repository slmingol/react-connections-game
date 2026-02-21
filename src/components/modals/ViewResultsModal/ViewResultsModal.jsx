import React from "react";

import { generateEmojiGrid } from "../../../lib/game-helpers";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";
import ShareScoreButton from "../../ShareScoreButton";
import BaseModal from "../BaseModal";
import { GameStatusContext } from "../../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";
import { Button } from "../../ui/button";
import { trackGameEvent, GameEvents } from "../../../lib/analytics";

function ViewResultsModal() {
  const { submittedGuesses } = React.useContext(GameStatusContext);
  const { gameData } = React.useContext(PuzzleDataContext);

  const handleOpenModal = () => {
    trackGameEvent(GameEvents.VIEW_RESULTS_CLICKED);
  };

  return (
    <BaseModal
      title=""
      trigger={
        <Button 
          variant="submit" 
          className="w-full" 
          children={"View Results"} 
          onClick={handleOpenModal}
        />
      }
      initiallyOpen={false}
      showActionButton={false}
      footerElements={<ShareScoreButton buttonText={"Share Your Score!"} />}
    >
      <div className="flex flex-col place-content-center">
        <p className="text-center font-[600]">
          Your Guesses Are Represented Below
        </p>
        <span className="text-center whitespace-pre mb-2">
          {"\n"}
          {generateEmojiGrid(gameData, submittedGuesses)}
        </span>
        <CountdownToNextPuzzle />
      </div>
    </BaseModal>
  );
}

export default ViewResultsModal;
