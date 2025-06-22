// Type definitions for the Discord Dashboard

export interface User {
  id: string;
  username: string;
  avatar: string;
  joinDate: string;
  role: string;
  isOnline: boolean;
}

export interface Role {
  id: string;
  name: string;
  color: string;
  permissions: string[];
  isVisible: boolean;
  memberCount: number;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  channelId: string;
}

export interface ServerStats {
  totalMembers: number;
  onlineUsers: number;
  activeRoles: number;
  messagesToday: number;
  memberGrowth: Array<{ month: string; members: number }>;
}

export interface DashboardState {
  users: User[];
  roles: Role[];
  messages: Message[];
  stats: ServerStats;
  currentPage: string;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
}

export type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  path: string;
};
