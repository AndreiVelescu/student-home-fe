import { gql } from "@apollo/client";

export const FORM_MUTATION = gql`
  mutation CreateRequest($files: [Upload!]!, $request: CreateRequestInput!) {
    createRequest(files: $files, request: $request) {
      id
    }
  }
`;

export const UPLOAD_MUTATION = gql`
  mutation CreateRequest(
    $files: RequestFilesInput!
    $request: CreateRequestInput!
  ) {
    createRequest(files: $files, request: $request)
  }
`;

export const NOTIFICATION_MUTATION = gql`
  mutation CreateOneNotification($data: NotificationCreateInput!) {
    createOneNotification(data: $data) {
      userId
      message
      title
    }
  }
`;
