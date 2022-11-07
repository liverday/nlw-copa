import React, { useCallback, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Heading, HStack, Text, useToast, VStack } from 'native-base';
import Header from '../../components/Header';
import Poll from '../../models/poll';
import { WithCount } from '../../models/utils';
import api from '../../services/api';
import Loading from '../../components/Loading';
import PollHeader from '../../components/PollHeader';
import EmptyMyPollList from '../../components/EmptyMyPollList';
import Option from '../../components/Option';
import { Share } from 'react-native';
import Guesses from '../../components/Guesses';

interface RouteParams {
  id: string
}

const Details: React.FC = () => {
  const route = useRoute();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const [poll, setPoll] = useState<WithCount<Poll, 'participants'>>({} as WithCount<Poll, 'participants'>)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');

  const { id } = route.params as RouteParams;

  useFocusEffect(useCallback(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { data } = await api.get(`/polls/${id}`);

        setPoll(data.poll);
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
    })();
  }, [id]));

  const handleCodeShare = useCallback(async () => {
    await Share.share({
      title: 'Participe deste bolão comigo!',
      message: poll.code
    });

  }, [poll]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={poll.title} showBackButton showShareButton onShare={handleCodeShare} />

      {poll._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader poll={poll} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option 
              title="Seus palpites" 
              isSelected={optionSelected === 'guesses'} 
              onPress={() => setOptionSelected('guesses')}
            />
            <Option 
              title="Ranking do grupo" 
              isSelected={optionSelected === 'ranking'} 
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>

          <Guesses pollId={poll.id} />
        </VStack>
      ) : (
        <EmptyMyPollList code={poll.code} />
      )}

    </VStack>
  )
}

export default Details