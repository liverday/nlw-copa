import { Heading, HStack, Text, VStack } from 'native-base';

import Participants from '../Participants';
import Poll from '../../models/poll';
import { WithCount } from '../../models/utils';

interface Props {
  poll: WithCount<Poll, 'participants'>;
}

const PoolHeader: React.FC<Props> = ({ poll }: Props) => {
  return (
    <HStack
      w="full"
      h={20}
      bgColor="transparent"
      borderBottomWidth={1}
      borderBottomColor="gray.600"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      p={4}
    >
      <VStack>
        <Heading color="white" fontSize="md" fontFamily="heading">
          {poll.title}
        </Heading>

        <HStack>
          <Text color="gray.200" fontSize="xs" mr={1}>
            Código:
          </Text>

          <Text color="gray.200" fontSize="xs" fontFamily="heading">
            {poll.code}
          </Text>
        </HStack>
      </VStack>

      <Participants
        count={poll._count?.participants}
        participants={poll.participants}
      />
    </HStack>
  );
}

export default PoolHeader;