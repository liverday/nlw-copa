import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';
import Poll from '../../models/poll';
import Participants from '../Participants';
import React from 'react';
import { WithCount } from '../../models/utils';

type PollCardProps = TouchableOpacityProps & {
  poll: WithCount<Poll, 'participants'>
}

const PollCard: React.FC<PollCardProps> = ({ poll, ...rest }) => {

  return (
    <TouchableOpacity {...rest}>
      <HStack
        w="full"
        h={20}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="yellow.500"
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={4}
      >
        <VStack>
          <Heading color="white" fontSize="md" fontFamily="heading">
            {poll.title}
          </Heading>
          <Text color="gray.200" fontSize="xs">
            Criado por {poll.owner.name}
          </Text>
        </VStack>
        <Participants
          participants={poll.participants} 
          count={poll._count.participants}
        />
      </HStack>
    </TouchableOpacity>
  )
}

export default PollCard;