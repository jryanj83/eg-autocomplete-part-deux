import { Avatar, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchAvatar } from "@/services/avatar";

import type { UserAvatarProps } from "./types";

// This is an example of useing Tanstack Query to fetch data
export const UserAvatar = ({ name, size = 80 }: UserAvatarProps) => {
  const { data: avatarUrl, isLoading } = useQuery({
    queryKey: ['avatar', name],
    queryFn: () => fetchAvatar(name),
    staleTime: Infinity, // Avatar won't change for the same name
  });

  // Show a skeleton while the avatar is loading
  if (isLoading) {
    return <Skeleton variant="circular" width={size} height={size} />;
  }

  return (
    <Avatar
      src={avatarUrl}
      sx={{ width: size, height: size }}
      alt={name}
    />
  );
}; 