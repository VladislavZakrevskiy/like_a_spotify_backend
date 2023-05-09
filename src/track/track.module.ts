import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { PrismaService } from "src/prisma.service";
import { PrismaModule } from "src/prisma.module";
import { FileService } from "src/files/files.service";






@Module({
    controllers: [TrackController],
    providers: [TrackService, FileService],
    imports: [PrismaModule]
})
export class TrackModule {

}