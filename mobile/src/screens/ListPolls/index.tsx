import React from 'react';
import { VStack, Icon } from 'native-base';
import { Octicons } from '@expo/vector-icons';

import Header from '../../components/Header';

import Button from '../../components/Button';

const ListPolls: React.FC = () => {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}>Buscar bolão por código</Button>
      </VStack>
    </VStack>
  )
}

export default ListPolls;