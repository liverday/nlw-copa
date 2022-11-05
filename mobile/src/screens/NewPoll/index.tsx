import React from 'react';
import { VStack, Text, Heading } from 'native-base';
import Header from '../../components/Header';
import Input from '../../components/Input';

import Logo from '../..assets/logo.svg';
import Button from '../../components/Button';

const NewPoll: React.FC = () => {
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
        />

        <Button
          type="PRIMARY"
          mt={2}
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