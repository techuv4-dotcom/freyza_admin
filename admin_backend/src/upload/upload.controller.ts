import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { multerOptions } from './multer.config';

@Controller('upload')
export class UploadController {
  @Post(':folder')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  uploadImage(
    @Param('folder') folder: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      success: true,
      data: {
        fileName: `/public/uploads/${folder}/${file.filename}`,
        imageUrl: `${process.env.APP_URL}/public/uploads/${folder}/${file.filename}`,
      },
    };
  }
  @Post('multiple/:folder')
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions))
  uploadImages(
    @Param('folder') folder: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return {
      success: true,
      data: files.map((file) => ({
        fileName: `/public/uploads/${folder}/${file.filename}`,
        imageUrl: `${process.env.APP_URL}/public/uploads/${folder}/${file.filename}`,
      })),
    };
  }
}
