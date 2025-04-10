import { gql } from "@apollo/client";

export const FORM_MUTATION = gql`
  mutation CreateRequest(
    $files: RequestFilesInput!
    $request: CreateRequestInput!
  ) {
    createRequest(files: $files, request: $request)
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
