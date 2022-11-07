import { Text } from 'native-base';

const EmptyRakingList: React.FC = () => {
  return (
    <Text color="white" fontSize="sm" textAlign="center">
      O ranking desse bolão ainda não foi {'\n'} 
      formado, aguarde os resultados.
    </Text>
  );
}

export default EmptyRakingList;