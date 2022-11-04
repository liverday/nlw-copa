import React from 'react';
import { Button as NativeBaseButton, Text, IButtonProps } from 'native-base';

type ButtonProps = IButtonProps & {
  children?: React.ReactNode
  type?: 'PRIMARY' | 'SECONDARY';
}

const backgroundColorDictionary: {
  [key in 'PRIMARY' | 'SECONDARY' | 'PRIMARY_PRESSED' | 'SECONDARY_PRESSED']: string
} = {
  SECONDARY: 'red.500',
  PRIMARY: 'yellow.500',
  SECONDARY_PRESSED: 'red.400',
  PRIMARY_PRESSED: 'yellow.600',
}

const textColorDictionary: {
  [key in 'PRIMARY' | 'SECONDARY']: string
} = {
  SECONDARY: 'white',
  PRIMARY: 'black'
}

const Button: React.FC<ButtonProps> = ({ children, type = 'PRIMARY', ...rest }) => {
  return (
    <NativeBaseButton 
      w="full"
      h={14}
      rounded="sm"
      bg={backgroundColorDictionary[type]}
      _pressed={{
        bg: backgroundColorDictionary[`${type}_PRESSED`]
      }}
      {...rest}
    >
      <Text 
        textTransform="uppercase" 
        fontSize="sm"
        fontFamily="heading"
        color={textColorDictionary[type]}
      >{children}
      </Text>
    </NativeBaseButton>
  )
}

export default Button;