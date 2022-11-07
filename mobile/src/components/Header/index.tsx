import { Box, HStack, Text } from 'native-base';
import { CaretLeft, Export } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import ButtonIcon from '../ButtonIcon';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  onShare?: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, showShareButton = false, onShare}) => {
  const { navigate } = useNavigation();
  const EmptyBoxSpace = () => (<Box w={6} h={6} />)

  return (
    <HStack w="full" h={24} bgColor="gray.800" alignItems="flex-end" pb={5} px={5}>
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {showBackButton ? <ButtonIcon icon={CaretLeft} onPress={() => navigate('list-polls')} /> : <EmptyBoxSpace />}

        <Text color="white" fontFamily="medium" fontSize="md" textAlign="center">
          {title}
        </Text>

        {showShareButton ? <ButtonIcon icon={Export} onPress={onShare} /> : <EmptyBoxSpace />}
      </HStack>
    </HStack>
  )
}

export default Header;