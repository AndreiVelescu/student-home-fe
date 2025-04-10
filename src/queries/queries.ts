import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    getNotifications {
      id
      message
      isRead
      createdAt
    }
  }
`;

export const MARK_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: Int!) {
    markNotificationAsRead(notificationId: $notificationId) {
      id
      isRead
    }
  }
`;

export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($message: String!) {
    createNotification(message: $message) {
      id
      message
      isRead
      createdAt
    }
  }
`;
