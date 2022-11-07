import { useToast, FlatList } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import Game from '../../models/game';
import api from '../../services/api';
import Guess from '../Guess';
import Loading from '../Loading';

type Props = {
  pollId: string;
}

const Guesses: React.FC<Props> = ({ pollId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const toast = useToast();

  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/polls/${pollId}/games`);

      setGames(data.games);
    } catch (err) {
      console.log(err.toJSON());

      toast.show({
        title: 'Não foi possível encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [pollId]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList 
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Guess 
        pollId={pollId}
        game={item} />
      }
      _contentContainerStyle={{ pb: 10 }}
    />
  )
}

export default Guesses;