import {Image, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from '../types/DBTypes';

type Props = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({item, navigation}: Props) => {
  // Replace localhost with the IP address of your computer
  const thumbnail = item.thumbnail.replace('localhost', '192.168.101.141');
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched', item.title);
        navigation.navigate('Single', {...item, thumbnail});
      }}
    >
      <Image style={{height: 300}} source={{uri: 'http:' + thumbnail}} />
      <Text>{item.title}</Text>
      <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
    </TouchableOpacity>
  );
};
export default MediaListItem;
