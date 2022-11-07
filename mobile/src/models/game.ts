import Guess from "./guess";

type Game = {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string,
  guess?: Guess;
}

export default Game;