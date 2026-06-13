export type InstagramConnectionStatus = 'connected' | 'disconnected' | 'processing';

export interface UserPreference {
  id: string;
  userId: string;
  preferredCategories: string[];
  engagementThreshold: number;
  // Add other preferences as needed
}

export interface AutomationLog {
  id: string;
  userId: string;
  actionType: 'like' | 'comment' | 'follow' | 'unfollow' | 'view_story';
  targetEntityId: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  instagramUsername?: string;
  connectionStatus: InstagramConnectionStatus;
  createdAt: string;
}
