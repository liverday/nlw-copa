import { Avatar, Center, HStack, Text } from 'native-base';
import { Participant } from '../../models/participant';

export type ParticipantProps = {
  participants: Participant[],
  count: number;
};

const Participants: React.FC<ParticipantProps> = ({ participants, count }) => {
  const shouldShowParticipantsCount = count == 0 || count > 4;

  return (
    <HStack>
      {participants.map(participant => (
        <Avatar
          key={participant.id}
          source={{ uri: participant.user.avatarUrl }}
          w={8}
          h={8}
          rounded="full"
          borderWidth={2}
          marginRight={-3}
          borderColor="gray.800"
        >
          {participant.user?.name?.at(0).toUpperCase()}
        </Avatar>
      ))}

      {shouldShowParticipantsCount && (
        <Center w={8} h={8} bgColor="gray.700" rounded="full" borderWidth={1} borderColor="gray.800">
          <Text color="gray.100" fontSize="xs" fontFamily="medium">
            {count > 0 ? `+${count - 4}` : 0}
          </Text>
        </Center>
      )}
    </HStack>
  )
}

export default Participants;