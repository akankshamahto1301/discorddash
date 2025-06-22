// Mock data for the Discord Dashboard

import { User, Role, Message, ServerStats } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "AdminUser",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-01-15",
    role: "Admin",
    isOnline: true,
  },
  {
    id: "2",
    username: "ModeratorMike",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-02-20",
    role: "Moderator",
    isOnline: true,
  },
  {
    id: "3",
    username: "GamerGirl",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b3c5?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-03-10",
    role: "Member",
    isOnline: false,
  },
  {
    id: "4",
    username: "DevDude",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-04-05",
    role: "Developer",
    isOnline: true,
  },
  {
    id: "5",
    username: "ArtistAnna",
    avatar:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-05-12",
    role: "Member",
    isOnline: false,
  },
  {
    id: "6",
    username: "TechTim",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-06-18",
    role: "VIP",
    isOnline: true,
  },
  {
    id: "7",
    username: "StreamerSarah",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-07-22",
    role: "Streamer",
    isOnline: true,
  },
  {
    id: "8",
    username: "NewbieBob",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf3532d3?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-08-30",
    role: "Member",
    isOnline: false,
  },
];

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    color: "#ff0000",
    permissions: ["all"],
    isVisible: true,
    memberCount: 1,
  },
  {
    id: "2",
    name: "Moderator",
    color: "#00ff00",
    permissions: ["kick", "ban", "mute"],
    isVisible: true,
    memberCount: 1,
  },
  {
    id: "3",
    name: "Developer",
    color: "#0066ff",
    permissions: ["create_channels"],
    isVisible: true,
    memberCount: 1,
  },
  {
    id: "4",
    name: "VIP",
    color: "#ffaa00",
    permissions: ["priority_speaker"],
    isVisible: true,
    memberCount: 1,
  },
  {
    id: "5",
    name: "Streamer",
    color: "#cc00ff",
    permissions: ["stream"],
    isVisible: true,
    memberCount: 1,
  },
  {
    id: "6",
    name: "Member",
    color: "#888888",
    permissions: ["send_messages"],
    isVisible: true,
    memberCount: 3,
  },
];

export const mockMessages: Message[] = [
  {
    id: "1",
    userId: "1",
    username: "AdminUser",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    content: "Welcome everyone to our Discord server! Please read the rules.",
    timestamp: "2023-08-30T10:30:00Z",
    channelId: "general",
  },
  {
    id: "2",
    userId: "2",
    username: "ModeratorMike",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    content: "Thanks for setting up the server! Looking forward to moderating.",
    timestamp: "2023-08-30T10:35:00Z",
    channelId: "general",
  },
  {
    id: "3",
    userId: "3",
    username: "GamerGirl",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b3c5?w=50&h=50&fit=crop&crop=face",
    content:
      "Hey everyone! Excited to be here. Anyone want to play some games?",
    timestamp: "2023-08-30T11:00:00Z",
    channelId: "gaming",
  },
  {
    id: "4",
    userId: "4",
    username: "DevDude",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop&crop=face",
    content: "I can help with any bot development if needed!",
    timestamp: "2023-08-30T11:15:00Z",
    channelId: "development",
  },
  {
    id: "5",
    userId: "7",
    username: "StreamerSarah",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    content: "Going live in 30 minutes! Come watch the stream!",
    timestamp: "2023-08-30T12:00:00Z",
    channelId: "streaming",
  },
];

export const mockStats: ServerStats = {
  totalMembers: 8,
  onlineUsers: 5,
  activeRoles: 6,
  messagesToday: 23,
  memberGrowth: [
    { month: "Jan", members: 1 },
    { month: "Feb", members: 2 },
    { month: "Mar", members: 3 },
    { month: "Apr", members: 4 },
    { month: "May", members: 5 },
    { month: "Jun", members: 6 },
    { month: "Jul", members: 7 },
    { month: "Aug", members: 8 },
  ],
};
