// Video type definition
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  courseName?: string; // Optional course name for teacher-uploaded videos
}

// Teacher/Channel type definition
export interface Channel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoCount: number;
}

// Teacher Video Upload type
export interface VideoUpload {
  videoUrl: string;
  courseName: string;
  description?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Error response type
export interface ErrorResponse {
  success: boolean;
  error: string;
  statusCode: number;
}