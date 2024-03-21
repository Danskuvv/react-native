//import {ListItem, Avatar} from '@rneui/themed';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ResizeMode, Video} from 'expo-av';
import {MediaItemWithOwner} from '../types/DBTypes';

type Props = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({item, navigation}: Props) => {
  const isVideo = item.media_type === 'video/mp4';
  return (
    <TouchableOpacity
      style={{alignItems: 'center', margin: 10}}
      onPress={() => navigation.navigate('Single', item)}
    >
      {isVideo ? (
        <Video
          source={{uri: item.filename}}
          style={{width: '100%', height: 300}}
          isMuted={true}
          shouldPlay={true}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={true}
        />
      ) : (
        <Image
          source={{uri: item.filename}}
          style={{width: '100%', height: 300}}
        />
      )}
      <Text style={{fontSize: 20, marginTop: 10}}>{item.title}</Text>
      <Text style={{fontSize: 16, color: 'gray'}}>
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </Text>
      <View
        style={{
          height: 1,
          backgroundColor: 'rgba(0,0,0,0.1)',
          width: '100%',
          marginTop: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default MediaListItem;
