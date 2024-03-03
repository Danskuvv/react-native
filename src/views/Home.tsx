import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';
import MediaRow from '../components/MediaListItem';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItemWithOwner | null>(
    null,
  );
  const {mediaArray} = useMedia();

  const renderItem = ({item}) => (
    <MediaRow
      key={item.media_id}
      item={item}
      setSelectedItem={setSelectedItem}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Media</Text>
      {selectedItem && (
        <SingleView
          item={selectedItem}
          setSelectedItem={(item: MediaItemWithOwner | undefined) =>
            setSelectedItem(item || null)
          }
        />
      )}
      <FlatList
        data={mediaArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.media_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
