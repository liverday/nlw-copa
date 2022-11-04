import { Image, IImageProps } from 'native-base';

const Flag: React.FC<IImageProps> = ({ ...rest }) => {
  return (
    <Image
      {...rest}
      alt="Bandeira"
      w={8}
      h={6}
      mx={3}
    />
  );
}

export default Flag;