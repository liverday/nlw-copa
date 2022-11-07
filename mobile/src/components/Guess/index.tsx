import { useToast } from "native-base";
import React, { useCallback, useState } from "react";
import GameModel from "../../models/game";
import api from "../../services/api";
import Game from "../Game";

type Props = {
  pollId: string;
  game: GameModel
}

const Guess: React.FC<Props> = ({ pollId, game }) => {
  const [firstTeamGoals, setFirstTeamGoals] = useState('');
  const [secondTeamGoals, setSecondTeamGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();  

  const handleGuessConfirmation = useCallback(async () => {
    if (!firstTeamGoals.trim() || !secondTeamGoals.trim()) {
      return toast.show({
        title: 'Informe o placar do palpite',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {
      setIsLoading(true);
      await api.post(`/polls/${pollId}/games/${game.id}/guesses`, {
        firstTeamGoals: Number(firstTeamGoals),
        secondTeamGoals: Number(secondTeamGoals)
      })

      toast.show({
        title: 'Palpite criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })
    } catch (err) {
      toast.show({
        title: 'Não foi possível salvar o palpite',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }, [game, toast, firstTeamGoals, secondTeamGoals]);

  return (
    <Game
      game={game}
      isLoading={isLoading}
      setFirstTeamGoals={setFirstTeamGoals}
      setSecondTeamGoals={setSecondTeamGoals}
      onGuessConfirm={handleGuessConfirmation}
    />
  )
};

export default Guess;

