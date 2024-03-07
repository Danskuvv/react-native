import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text} from '@rneui/themed';
import {StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserContext} from '../hooks/ContextHooks';
import {useCommentStore} from '../store';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useComment} from '../hooks/apiHooks';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const {comments, setComments} = useCommentStore();
  const {user} = useUserContext();
  const {getCommentsByMediaId, postComment} = useComment();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm(); // Use useForm from react-hook-form

  useEffect(() => {
    register('comment_text', {required: 'Comment is required'});
  }, [register]);

  const doComment = async (data: any) => {
    const token = await AsyncStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      await postComment(data.comment_text, item.media_id, token);
      await getComments();
      setValue('comment_text', ''); // Reset the comment_text field
    } catch (error) {
      console.error('postComment failed', error);
    }
  };

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      console.error('getComments failed', error);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <View>
        {user && (
          <View style={styles.commentInputContainer}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.commentInput}
                onChangeText={(text) => setValue('comment_text', text)}
                placeholder="Comment"
              />
              <Button title="Post" onPress={handleSubmit(doComment)} />
            </View>
            {errors.comment_text && (
              <View style={styles.errorMessage}>
                <Text style={{color: 'darkred'}}>
                  {errors.comment_text.message?.toString()}
                </Text>
              </View>
            )}
          </View>
        )}
        {comments.length > 0 && (
          <View>
            <Text>Comments</Text>
            {comments.map((comment) => (
              <View style={styles.commentContainer} key={comment.comment_id}>
                <Text>
                  On {new Date(comment.created_at!).toLocaleDateString('fi-FI')}{' '}
                  {comment.username} wrote: {comment.comment_text}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  commentInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingLeft: 10,
    maxWidth: 232,
  },
  container: {
    flexDirection: 'column',
  },
  commentContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  errorMessage: {
    maxWidth: 232,
  },
});

export default Comments;
