import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Multer } from 'multer';  // Ajoute cette ligne pour importer les types de Multer


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' est le nom du champ dans le formulaire
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = await this.filesService.uploadFile(file);
    return { message: 'File uploaded successfully', filePath };
  }
}
