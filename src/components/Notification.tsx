import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Badge,
  Box,
  Button,
  IconButton,
  Popper,
  Fade,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../Context/AuthContext";
import theme from "../theme/theme.d"; // Importă tema personalizată
import MessageContainer from "./MessageContainer";

const GET_NOTIFICATIONS = gql`
  query GetNotificationsByUser($userId: Int!) {
    notifications(
      where: { userId: { equals: $userId } }
      orderBy: { createdAt: desc }
    ) {
      id
      title
      message
      createdAt
      status
    }
  }
`;

const MARK_NOTIFICATIONS_AS_READ = gql`
  mutation UpdateManyNotification($data: NotificationUpdateManyMutationInput!) {
    updateManyNotification(data: $data) {
      count
    }
  }
`;

const MARK_NOTIFICATION_AS_READ = gql`
  mutation UpdateOneNotification(
    $data: NotificationUpdateInput!
    $where: NotificationWhereUniqueInput!
  ) {
    updateOneNotification(data: $data, where: $where) {
      id
      status
    }
  }
`;

export interface INotification {
  title: string;
  message: string;
  status: boolean;
  id: string;
  createdAt: string;
}

interface INotifications {
  notifications: INotification[];
}

export default function NotificationCenter() {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<INotification | null>(
    null
  );
  const { currentUser } = useAuth();

  const { loading, error, data, refetch } = useQuery<INotifications>(
    GET_NOTIFICATIONS,
    {
      variables: { userId: currentUser()?.id },
      pollInterval: 5000,
    }
  );

  const [markNotificationsAsRead] = useMutation(MARK_NOTIFICATIONS_AS_READ, {
    onCompleted: () => {
      refetch();
    },
  });

  const [markNotificationAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
    onCompleted: () => {
      refetch();
    },
  });

  const toggleNotificationCenter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleFilter = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  const handleNotificationClick = async (notification: INotification) => {
    if (!notification.status) {
      await markNotificationAsRead({
        variables: {
          data: { status: { set: true } },
          where: { id: notification.id },
        },
      });
    }
    setSelectedMessage(notification);
  };

  const markAllAsRead = async () => {
    if (data?.notifications) {
      const unreadIds = data.notifications
        .filter((n) => !n.status)
        .map((n) => n.id);

      await markNotificationsAsRead({
        variables: {
          data: {
            status: { set: true },
          },
          where: {
            id: { in: unreadIds },
          },
        },
      });
    }
  };

  const handleBackToNotifications = () => {
    setSelectedMessage(null);
  };

  if (loading) return <p>Se încarcă notificările...</p>;
  if (error) return <p>Eroare la încărcarea notificărilor: {error.message}</p>;

  return (
    <Box sx={{ margin: "8px" }}>
      <IconButton size="large" onClick={toggleNotificationCenter}>
        <Badge
          badgeContent={data?.notifications.filter((n) => !n.status).length}
          color="default"
        >
          <MailIcon color="primary" />
        </Badge>
      </IconButton>

      <Popper open={isOpen} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                maxWidth: "380px",
                width: "100%",
                borderRadius: "20px",
                boxShadow: theme.shadows[3],
                background: theme.palette.background.paper,
                padding: "16px",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  background: theme.palette.background.paper,
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "10px",
                  color: theme.palette.primary.contrastText,
                  minWidth: "310px",
                }}
              >
                <Typography
                  variant="h1"
                  fontFamily={theme.typography.fontFamily}
                  textAlign="center"
                >
                  Notificari
                </Typography>

                <FormGroup
                  sx={{
                    color: theme.palette.primary.main,

                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        color="default"
                        onChange={toggleFilter}
                        checked={showUnreadOnly}
                      />
                    }
                    label={
                      <Typography
                        variant="h6"
                        color={theme.palette.text.primary}
                        padding="10px"
                        textAlign="center"
                      >
                        Mesaje necitite
                      </Typography>
                    }
                    labelPlacement="end"
                  />
                </FormGroup>
              </Box>
              {selectedMessage ? (
                <Box>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackToNotifications}
                    sx={{
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    Back to Notifications
                  </Button>
                  <MessageContainer message={selectedMessage} />
                </Box>
              ) : (
                <Stack
                  sx={{
                    height: "400px",
                    width: "100%",
                    padding: "12px",
                    background: theme.palette.background.default,
                    borderRadius: "5px",
                    overflowY: "auto",
                    marginTop: "10px",
                    boxShadow: theme.shadows[1],
                  }}
                  spacing={2}
                >
                  {(!data?.notifications.length ||
                    (data?.notifications.filter((n) => !n.status).length ===
                      0 &&
                      showUnreadOnly)) && (
                    <Typography
                      variant="body1"
                      color={theme.palette.text.primary}
                    >
                      Nu ai mesaje necitite.
                      <span role="img" aria-label="celebration">
                        🎉
                      </span>
                    </Typography>
                  )}
                  {(showUnreadOnly
                    ? data?.notifications.filter((v) => !v.status)
                    : data?.notifications
                  )?.map((notification) => {
                    return (
                      <Box
                        key={notification.id}
                        sx={{
                          boxShadow: theme.shadows[1],
                          borderRadius: "5px",
                          transition: "transform 0.2s ease-in-out",
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                          padding: 2,
                          "&:hover": {
                            background: theme.palette.action.hover,
                            transform: "translateY(-2px)",
                          },
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {notification.title}
                        </Typography>
                        <Box>
                          {notification.status ? (
                            <CheckIcon />
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="mark as read"
                            ></IconButton>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    boxShadow: theme.shadows[2],
                    "&:hover": {
                      boxShadow: theme.shadows[3],
                    },
                  }}
                  onClick={markAllAsRead}
                >
                  Marcheaza citite
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "none",
                    boxShadow: theme.shadows[2],
                    "&:hover": {
                      boxShadow: theme.shadows[3],
                    },
                  }}
                  onClick={markAllAsRead}
                >
                  Sterge toate
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
