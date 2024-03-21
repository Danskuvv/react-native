import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {Header} from '@rneui/themed';
import React from 'react';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';

const Home = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  //const context = React.useContext(UpdateContext);
  const {mediaArray} = useMedia();

  /* const update = context?.update;
  if (update === undefined) {
    throw new Error('UpdateContext is null');
  }

  React.useEffect(() => {
    console.log('Home useEffect');
  }, [update]); */

  return (
    <>
      <ScrollView>
        <Header
          centerComponent={{text: 'Home', style: {color: '#fff', fontSize: 20}}}
        />
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
