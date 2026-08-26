import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getImageUrl(folder: string, fileName: string) {
    if (!fileName) return null;

    return `/public/uploads/${folder}/${fileName}`;
  }
}
