import { useState } from "react";
import LeducMCCFRGame, { State } from "../lib/game/LeducMCCFRGame";

export const useLeducMCCFRGame = () => {
  const [game, setGame] = useState<LeducMCCFRGame | null>(null);

  return { game, setGame };
};
