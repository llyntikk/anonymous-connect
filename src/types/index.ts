export interface User {
  id: string;
  telegramId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  balance: number;
  createdAt: Date;
  isBlocked: boolean;
  role: 'user' | 'admin' | 'super_admin';
}

export interface Link {
  id: string;
  userId: string;
  name: string;
  slug: string;
  url: string;
  messagesCount: number;
  viewsCount: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Message {
  id: string;
  linkId: string;
  senderId?: string;
  content: string;
  isRead: boolean;
  isModerated: boolean;
  createdAt: Date;
  replies: MessageReply[];
}

export interface MessageReply {
  id: string;
  messageId: string;
  content: string;
  isFromOwner: boolean;
  createdAt: Date;
}

export interface Dialog {
  id: string;
  anonymousId: string;
  linkId: string;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
  messagesCount: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'earning' | 'withdrawal' | 'bonus' | 'referral';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: Date;
  description: string;
}

export interface AdminStats {
  usersOnline: number;
  totalUsers: number;
  messagesDay: number;
  revenue: number;
  pendingWithdrawals: number;
  pendingModeration: number;
}

export interface UserStats {
  balance: number;
  totalMessages: number;
  totalViews: number;
  activeLinks: number;
  pendingWithdrawal: number;
}

export interface Notification {
  id: string;
  type: 'message' | 'balance' | 'system';
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}
