import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {Header} from '@rneui/themed';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';

const Home = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useMedia();
  return (
    <>
      <Header
        centerComponent={{text: 'Home', style: {color: '#fff', fontSize: 20}}}
      />
      <ScrollView>
        {mediaArray.map((item) => (
          <MediaListItem
            key={item.media_id}
            navigation={navigation}
            item={item}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default Home;
