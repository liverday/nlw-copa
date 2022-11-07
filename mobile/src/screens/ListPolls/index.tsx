import React, { useCallback, useState } from 'react';
import { VStack, Icon, useToast, FlatList } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../components/Header';

import Button from '../../components/Button';
import { WithCount } from '../../models/utils';
import Poll from '../../models/poll';
import api from '../../services/api';
import Loading from '../../components/Loading';
import PollCard from '../../components/PollCard';
import EmptyPollList from '../../components/EmptyPollList';

const ListPolls: React.FC = () => {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [polls, setPolls] = useState<WithCount<Poll, 'participants'>[]>([]);

  const toast = useToast();

  useFocusEffect(useCallback(() => {
    (async () => {
      try {
        setIsLoading(true)
        const { data } = await api.get('/polls');

        setPolls(data.polls);
      } catch (err) {
        console.log(err);

        toast.show({
          title: 'Não foi possível carregar os bolões',
          placement: 'top',
          bgColor: 'red.500'
        })
      } finally {
        setIsLoading(false);
      }
    })();
  }, []));

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find-poll')}
        >Buscar bolão por código</Button>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          ListEmptyComponent={() => <EmptyPollList />}
          data={polls}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PollCard
              poll={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
        />
      )}
    </VStack>
  )
}

export default ListPolls;