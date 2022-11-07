import React, { useCallback, useState } from 'react';
import { VStack, Text, Heading, useToast } from 'native-base';
import Header from '../../components/Header';
import Input from '../../components/Input';

import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import api from '../../services/api';

const NewPoll: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handlePollCreate = useCallback(async () => {
    if (title.trim().length === 0) {
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'top',
        background: 'red.500'
      })
    }

    try {
      setIsLoading(true)

      await api.post('/polls', {
        title: title.toUpperCase()
      });

      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        background: 'greeb.500'
      })

      setTitle('');
    } catch (err) {
      console.log(err.toJSON());

      toast.show({
        title: 'Não foi possível criar o seu bolão',
        placement: 'top',
        background: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading mt={8} fontFamily="heading" fontSize="xl" color="white" textAlign="center">
          Crie seu próprio bolão da copa{'\n'}e compartilhe entre amigos!
        </Heading>

        <Input
          mt={8}
          placeholder="Qual o nome do seu bolão?"
          value={title}
          onChangeText={setTitle}
        />

        <Button
          type="PRIMARY"
          mt={2}
          onPress={handlePollCreate}
          isLoading={isLoading}
        >
          Criar meu bolão
        </Button>

        <Text color="gray.200" textAlign="center" mt={4}>
          Após criar seu bolão, você receberá um{'\n'}código único que poderá usar para convidar{'\n'}outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}

export default NewPoll;