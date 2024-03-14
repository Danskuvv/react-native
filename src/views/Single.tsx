import {Card, Text, ListItem, Icon, Button} from '@rneui/themed';
import {Video, ResizeMode} from 'expo-av';
import {Alert, ScrollView} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {MediaItemWithOwner} from '../types/DBTypes';
import Likes from '../components/Likes';
import Comments from '../components/Comments';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';
import {UpdateContext} from '../contexts/UpdateContext';

const Single = ({route}: any) => {
  const context = React.useContext(UpdateContext);
  const item: MediaItemWithOwner = route.params;
  const [fileType, fileFormat] = item.media_type.split('/');
  const {deleteMedia} = useMedia();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useUserContext();
  /*item.filename = item.filename.replace(
    'http://localhost',
    'http://192.168.101.141',
  );
  */

  if (context === null) {
    throw new Error('UpdateContext is null');
  }

  const {update, setUpdate} = context;

  return (
    <ScrollView>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        {fileType === 'image' ? (
          <Card.Image
            style={{height: 400}}
            resizeMode="contain"
            source={{uri: item.filename}}
          />
        ) : (
          <Video
            style={{height: 400}}
            source={{uri: item.filename}}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        )}
        <ListItem>
          <Likes item={item} />
        </ListItem>
        {user?.user_id === item.user_id && (
          <>
            <ListItem>
              <Button
                title="Modify"
                onPress={() => navigation.navigate('Modify', {item})}
              />
            </ListItem>
            <ListItem>
              <Button
                title="Delete"
                onPress={() => {
                  console.log('test delete');
                  Alert.alert(
                    'Delete Media',
                    'Are you sure you want to delete this media?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: async () => {
                          const token = await AsyncStorage.getItem('token');
                          if (token) {
                            await deleteMedia(item.media_id, token);
                            navigation.navigate('Home');
                            setUpdate(!update);
                          } else {
                            console.error('No token found');
                          }
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}
              />
            </ListItem>
          </>
        )}
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
