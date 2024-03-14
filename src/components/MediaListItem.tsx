import {ListItem, Avatar} from '@rneui/themed';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from '../types/DBTypes';

type Props = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({item, navigation}: Props) => {
  /* const thumbnail = item.thumbnail.replace(
    'http://localhost',
    'http://192.168.101.141',
  );
  */
  return (
    <ListItem bottomDivider onPress={() => navigation.navigate('Single', item)}>
      <Avatar source={{uri: item.thumbnail}} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>
          {new Date(item.created_at).toLocaleString('fi-FI')}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default MediaListItem;
