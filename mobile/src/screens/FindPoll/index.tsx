import React, { useCallback, useState } from 'react';
import { VStack, Heading, useToast } from 'native-base';
import Header from '../../components/Header';
import Input from '../../components/Input';

import Button from '../../components/Button';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const FindPoll: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const toast = useToast();
  const { navigate } = useNavigation();

  const handleJoinPoll = useCallback(async () => {
    if (code.trim().length === 0) {
      return toast.show({
        title: 'Informe um código para o seu bolão',
        placement: 'top',
        background: 'red.500'
      })
    }

    try {
      setIsLoading(true);

      await api.post('/polls/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('list-polls');
    } catch (err) {

      const message = getErrorMessage(err.response?.data?.message);

      toast.show({
        title: message,
        placement: 'top',
        bgColor: 'red.500'
      })

      setIsLoading(false);
    }
  }, [code, toast]);

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" fontSize="xl" color="white" textAlign="center">
          Encontre um bolão através de{'\n'}seu código único
        </Heading>

        <Input
          mt={8}
          placeholder="Qual o código do bolão?"
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <Button
          type="PRIMARY"
          mt={2}
          isLoading={isLoading}
          onPress={handleJoinPoll}
        >
          Buscar bolão
        </Button>
      </VStack>
    </VStack>
  )
}

export default FindPoll;

function getErrorMessage(message: string): string {
  const defaultMessage = 'Não foi possível encontrar o bolão'
  const messageDictionary: {
    [key: string]: string 
  } = {
    'Poll not found': 'Bolão não encontrado',
    'You already joined this poll.': 'Você já está participando deste bolão!'
  }

  return messageDictionary[message] || defaultMessage
}
