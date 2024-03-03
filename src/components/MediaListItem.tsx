import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import Likes from './Likes';

const MediaRow = (props: {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner) => void;
}) => {
  const {item} = props;
  const {user} = useUserContext();

  return (
    <View style={styles.row}>
      <Image style={styles.image} source={{uri: item.thumbnail}} />
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Text style={styles.text}>
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </Text>
      <Text style={styles.text}>{item.filesize}</Text>
      <Text style={styles.text}>{item.media_type}</Text>
      <Text style={styles.text}>{item.username}</Text>
      <View>
        <TouchableOpacity onPress={() => props.setSelectedItem(item)}>
          <Text style={styles.button}>Show</Text>
        </TouchableOpacity>
        <Likes item={item} />
        {user &&
          (user.user_id === item.user_id || user.level_name === 'Admin') && (
            <>
              <TouchableOpacity onPress={() => console.log('modify', item)}>
                <Text style={styles.button}>Modify</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('delete', item)}>
                <Text style={styles.button}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 60,
    height: 60,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    margin: 5,
    textAlign: 'center',
  },
});

export default MediaRow;
