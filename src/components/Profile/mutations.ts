import { gql } from "@apollo/client";

export const UPLOAD_USER_PROFILE_PICTURE = gql`
  mutation UploadUserProfilePicture($file: Upload!) {
    uploadUserProfilePicture(file: $file)
  }
`;

export const ADD_NEWS = gql`
  mutation Mutation($data: NewsCreateInput!) {
    createOneNews(data: $data) {
      id
      description
      title
      date
    }
  }
`;
export const GET_ALL_NEWS = gql`
  query FindManyNews {
    findManyNews {
      id
      description
      date
      title
    }
  }
`;

export const GET_AVATAR_URL = gql`
  query GetUser($where: UserWhereUniqueInput!) {
    getUser(where: $where) {
      profilePictureurl
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getFullUser {
    getCurrentUser {
      id
      email
      profilePictureurl
      FirstName
      lastName
      phone
      university
      preferences {
        cleanliness
        quietness
        lifestyle
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateOneUser(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateOneUser(data: $data, where: $where) {
      id
      lastName
      FirstName
      preferences {
        cleanliness
        quietness
        lifestyle
      }
    }
  }
`;
