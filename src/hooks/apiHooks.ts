import {useEffect, useState} from 'react';
import {
  Comment,
  Like,
  MediaItem,
  MediaItemWithOwner,
  User,
} from '../types/DBTypes';
import {fetchData} from '../functions';
import {Credentials} from '../types/localTypes';
import {
  LoginResponse,
  MediaResponse,
  MessageResponse,
  UploadResponse,
  UserResponse,
} from '../types/MessageTypes';
// DONE: add necessary imports
const useMedia = () => {
  // DONE: move mediaArray state here
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  // DONE: move getMedia function here
  // DONE: move useEffect here

  const getMediaWithOwners = async () => {
    try {
      const mediaItems = await fetchData<MediaItem[]>(
        `${process.env.EXPO_PUBLIC_MEDIA_API}/media`,
      );
      const mediaItemsWithOwners: Promise<MediaItemWithOwner>[] =
        mediaItems.map(async (item) => {
          const userData = await fetchData<{username: string}>(
            `${process.env.EXPO_PUBLIC_AUTH_API}/users/${item.user_id}`,
          );
          return {...item, username: userData.username};
        });
      const result = await Promise.all(mediaItemsWithOwners);
      console.log(result); // Log the array of media items with owners
      setMediaArray(result);
    } catch (error) {
      console.error('getMediaWithOwners', error);
    }
  };

  useEffect(() => {
    getMediaWithOwners();
  }, []);

  const postMedia = async (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string,
  ) => {
    // TODO: create a suitable object for Media API, the type is MediaItem without media_id, user_id, thumbnail and created_at. All those are generated by the API. Remember to add app_id from .env.local
    const media: Omit<
      MediaItem,
      'media_id' | 'user_id' | 'thumbnail' | 'created_at'
    > = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };
    // TODO: post the data to Media API and get the data as MediaResponse
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(media),
    };
    return fetchData<MediaResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/media',
      options,
    );
    // TODO: return the data
  };

  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    try {
      return await fetchData<LoginResponse>(
        process.env.EXPO_PUBLIC_AUTH_API + '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(creds),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {postLogin};
};

const useUser = () => {
  // TODO: implement network functions for auth server user endpoints
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<UserResponse>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users/token/',
      options,
    );
  };

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    await fetchData<UserResponse>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users',
      options,
    );
  };

  const getUsernameAvailable = async (username: string) => {
    const result = await fetchData<{available: boolean}>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users/username/' + username,
    );
    return result;
  };

  const getEmailAvailable = async (email: string) => {
    const result = await fetchData<{available: boolean}>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users/email/' + email,
    );
    return result;
  };

  const getUserById = async (user_id: number) => {
    return await fetchData<User>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users/' + user_id,
    );
  };

  return {
    getUserByToken,
    postUser,
    getUsernameAvailable,
    getEmailAvailable,
    getUserById,
  };
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    // TODO: create FormData object
    const formData = new FormData();
    // TODO: add file to FormData
    formData.append('file', file);
    // TODO: upload the file to file server and get the file data
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    // TODO: return the file data. The type is UploadResponse
    return await fetchData<UploadResponse>(
      process.env.EXPO_PUBLIC_UPLOAD_SERVER + '/upload',
      options,
    );
  };
  return {postFile};
};

const useLike = () => {
  const postLike = async (media_id: number, token: string) => {
    // Send a POST request to /likes with object { media_id } and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id}),
    };

    return await fetchData<MessageResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/likes',
      options,
    );
  };

  const deleteLike = async (like_id: number, token: string) => {
    // Send a DELETE request to /likes/:like_id with the token in the Authorization header.
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<MessageResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/likes/' + like_id,
      options,
    );
  };

  const getCountByMediaId = async (media_id: number) => {
    // Send a GET request to /likes/:media_id to get the number of likes.
    return await fetchData<{count: number}>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/likes/count/' + media_id,
    );
  };

  const getUserLike = async (media_id: number, token: string) => {
    // Send a GET request to /likes/bymedia/user/:media_id to get the user's like on the media.
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<Like>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/likes/bymedia/user/' + media_id,
      options,
    );
  };

  return {postLike, deleteLike, getCountByMediaId, getUserLike};
};

const useComment = () => {
  const postComment = async (
    comment_text: string,
    media_id: number,
    token: string,
  ) => {
    // TODO: Send a POST request to /comments with the comment object and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({comment_text, media_id}),
    };

    return await fetchData<MessageResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/comments',
      options,
    );
  };

  const {getUserById} = useUser();

  const getCommentsByMediaId = async (media_id: number) => {
    // TODO: Send a GET request to /comments/:media_id to get the comments.
    const comments = await fetchData<Comment[]>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/comments/bymedia/' + media_id,
    );
    // Get usernames for all comments from auth api
    const commentsWithUsername = await Promise.all<
      Comment & {username: string}
    >(
      comments.map(async (comment) => {
        const user = await getUserById(comment.user_id);
        return {...comment, username: user.username};
      }),
    );
    return commentsWithUsername;
  };

  return {postComment, getCommentsByMediaId};
};

export {useMedia, useAuthentication, useUser, useFile, useLike, useComment};