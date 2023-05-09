import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { PrismaModule } from "src/prisma.module";
import { AlbumService } from "./album.service";
import { FileService } from "src/files/files.service";


@Module({
    controllers: [AlbumController],
    providers: [AlbumService, FileService],
    imports: [PrismaModule]
})
export class AlbumModule {}