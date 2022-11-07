import { HStack } from 'native-base';
import CountryFlag from 'react-native-country-flag';

import Input from '../Input';

interface Props {
  goals?: number,
  isInputDisabled: boolean;
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
}

const Team: React.FC<Props> = ({ isInputDisabled, goals, code, position, onChangeText }) => {
  return (
    <HStack alignItems="center">
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      <Input
        w={10}
        h={9}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
        value={goals != null ? String(goals) : null}
        isDisabled={isInputDisabled}
        _disabled={{
          color: 'gray.100'
        }}
      />

      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />}
    </HStack>
  );
}

export default Team;