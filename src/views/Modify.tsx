import {Button, Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUpdateContext from '../hooks/UpdateHooks';
import {useMedia} from '../hooks/apiHooks';

const Modify = ({route}: any) => {
  const item = route.params.item;
  const {putMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const initValues = {title: item.title, description: item.description};
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  /*const resetForm = () => {
    reset();
    setImage(null);
  };*/

  const doModify = async (inputs: {title: string; description: string}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const mediaResponse = await putMedia(item.media_id, inputs, token);
        setUpdate(!update);
        Alert.alert(mediaResponse.message);
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity style={{flex: 1}} activeOpacity={1}>
        <Card>
          <Card.Title>Modify</Card.Title>
          <Card.Image
            style={{aspectRatio: 1, height: 300}}
            source={{uri: item.filename}}
          />
          <Card.Divider />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Title required',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={
                  typeof errors.description?.message === 'string'
                    ? errors.description?.message
                    : undefined
                }
              />
            )}
            name="title"
          />

          <Controller
            control={control}
            rules={{
              maxLength: 1000,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={
                  typeof errors.description?.message === 'string'
                    ? errors.description?.message
                    : undefined
                }
                multiline={true}
                numberOfLines={5}
                style={{height: 120, textAlignVertical: 'top'}}
              />
            )}
            name="description"
          />

          <Card.Divider />
          <Button title="Upload" onPress={handleSubmit(doModify)} />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Modify;
