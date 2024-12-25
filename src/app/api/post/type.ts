interface EntityMap {
  [key: string]: {
    type: string;
    data: {
      src: string;
      file:File,
      fileinfo: {
        name: string;
        size: number;
        type: string;
        displayWidth: number;
        displayHeight: number;
        originalWidth: number;
        originalHeight: number;
      };
      tempKey?: string;
    };
  };
}

export type { EntityMap };