import {Card, Text, ListItem, Icon} from '@rneui/themed';
import {Video, ResizeMode} from 'expo-av';
import {ScrollView} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params;
  const [fileType, fileFormat] = item.media_type.split('&#x2F;');
  item.filename = item.filename.replace('localhost', '192.168.101.141');

  return (
    <ScrollView>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        {fileType === 'image' ? (
          <Card.Image
            style={{height: 400}}
            resizeMode="contain"
            source={{uri: 'http:' + item.filename}}
          />
        ) : (
          <Video
            style={{height: 400}}
            source={{uri: 'http:' + item.filename}}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        )}
        <ListItem>
          <Likes item={item} />
        </ListItem>
        <ListItem>
          <Text>{item.description}</Text>
        </ListItem>
        <ListItem>
          <Icon name="today" />
          <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
        </ListItem>
        <ListItem>
          <Icon name="person" />
          <Text>{item.username}</Text>
        </ListItem>
        <ListItem>
          <Icon name="image" />
          <Text>
            {fileType} / {fileFormat}, {Math.round(item.filesize / 1024)} kB
          </Text>
        </ListItem>
        <ListItem>
          <Comments item={item} />
        </ListItem>
      </Card>
    </ScrollView>
  );
};

export default Single;
