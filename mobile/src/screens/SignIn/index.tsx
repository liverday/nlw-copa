import React from 'react';
import { Center, Text, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';

import Button from '../../components/Button';
import Logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';


const SignIn: React.FC = () => {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button 
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        type="SECONDARY"
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: 'white' } }}
      >
        Entrar com Google
      </Button>

      <Text color="gray.200" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{'\n'}do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}

export default SignIn;