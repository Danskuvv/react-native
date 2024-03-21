import {Card, Text, ListItem, Icon} from '@rneui/themed';
import {Video, ResizeMode} from 'expo-av';
import {Alert, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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
  const [isMuted, setIsMuted] = useState(false);
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
        {user?.user_id === item.user_id ? (
          <Menu>
            <MenuTrigger style={{alignSelf: 'flex-end', marginTop: -60}}>
              <Text style={{fontSize: 30}}>...</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => navigation.navigate('Modify', {item})}
                text="Modify"
              />
              <MenuOption
                text="Delete"
                onSelect={async () => {
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
            </MenuOptions>
          </Menu>
        ) : null}
        {fileType === 'image' ? (
          <Image
            style={{height: 243, width: '100%'}}
            resizeMode="contain"
            source={{uri: item.filename}}
          />
        ) : (
          <>
            <Video
              style={{height: 400}}
              source={{uri: item.filename}}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isMuted={isMuted}
              shouldPlay={true}
            />
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginRight: 10, marginTop: 10}}
              onPress={() => setIsMuted(!isMuted)}
            >
              <FontAwesomeIcon
                name={isMuted ? 'volume-off' : 'volume-up'}
                size={30}
                color="#841584"
              />
            </TouchableOpacity>
          </>
        )}
        <ListItem>
          <Text>{item.description}</Text>
        </ListItem>
        <ListItem>
          <Likes item={item} />
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
