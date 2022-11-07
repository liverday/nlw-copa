import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Team from '../Team';
import GameModel from '../../models/game';

interface Props {
  game: GameModel;
  isLoading: boolean;
  onGuessConfirm: () => void;
  setFirstTeamGoals: (value: string) => void;
  setSecondTeamGoals: (value: string) => void;
};

const Game: React.FC<Props> = ({ 
  game, 
  isLoading,
  setFirstTeamGoals, 
  setSecondTeamGoals, 
  onGuessConfirm 
}) => {
  const { colors, sizes } = useTheme();

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(game.firstTeamCountryCode)} vs. {getName(game.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {format(parseISO(game.date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
          locale: ptBR
        })}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          isInputDisabled={!!game.guess}
          goals={game.guess?.firstTeamGoals}
          code={game.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamGoals}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          isInputDisabled={!!game.guess}
          goals={game.guess?.secondTeamGoals}
          code={game.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamGoals}
        />
      </HStack>

      {
        !game.guess &&
        <Button 
          size="xs" 
          w="full" 
          bgColor="green.500" 
          mt={4} 
          onPress={onGuessConfirm}
          isLoading={isLoading}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      }
    </VStack>
  );
}

export default Game;