import { Box, HStack, Text } from 'native-base';
import { CaretLeft, Export } from 'phosphor-react-native';
import React from 'react';
import ButtonIcon from '../ButtonIcon';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, showShareButton = false}) => {
  const EmptyBoxSpace = () => (<Box w={6} h={6} />)

  return (
    <HStack w="full" h={24} bgColor="gray.800" alignItems="flex-end" pb={5} px={5}>
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {showBackButton ? <ButtonIcon icon={CaretLeft} /> : <EmptyBoxSpace />}

        <Text color="white" fontFamily="medium" fontSize="md" textAlign="center">
          {title}
        </Text>

        {showShareButton ? <ButtonIcon icon={Export} /> : <EmptyBoxSpace />}
      </HStack>
    </HStack>
  )
}

export default Header;