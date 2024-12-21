declare namespace Express {
  export interface Request {
    userId: string;
  }

  export interface Request {
    file: Multer.File;
  }
}
