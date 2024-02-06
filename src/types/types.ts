export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}

export interface FileData {
  id: string;
  userId: string;
  fileName: string;
  fullName: string;
  profileImg: string;
  timeStemp: TimeStamp;
  type: string;
  size: number;
  downloadURL?: string;
}
