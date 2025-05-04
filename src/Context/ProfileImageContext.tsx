import { gql, useQuery } from "@apollo/client";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const GET_AVATAR_URL = gql`
  query GetUser($where: UserWhereUniqueInput!) {
    getUser(where: $where) {
      profilePictureurl
    }
  }
`;

const ProfileImageContext = createContext<{
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
}>({
  profileImageUrl: "",
  setProfileImageUrl: () => {},
});

export const ProfileImageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const { currentUser } = useAuth();
  useQuery(GET_AVATAR_URL, {
    variables: {
      where: {
        id: currentUser()?.id,
      },
    },
    onCompleted: (data) => {
      const url = data.getUser.profilePictureurl;
      setProfileImageUrl(url);
    },
  });

  return (
    <ProfileImageContext.Provider
      value={{ profileImageUrl, setProfileImageUrl }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImage = () => useContext(ProfileImageContext);
