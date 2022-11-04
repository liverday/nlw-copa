import React from 'react';
import { VStack, Heading } from 'native-base';
import Header from '../../components/Header';
import Input from '../../components/Input';

import Button from '../../components/Button';

const FindPool: React.FC = () => {
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
        />

        <Button
          type="PRIMARY"
          mt={2}
        >
          Buscar bolão
        </Button>
      </VStack>
    </VStack>
  )
}

export default FindPool;