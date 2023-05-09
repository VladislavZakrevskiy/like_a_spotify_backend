import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TrackModule } from "./track/track.module";
import { PrismaModule } from "./prisma.module";
import { FileModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
    controllers: [AppController],
    imports: 
    [
        TrackModule,
        PrismaModule, 
        FileModule, 
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        
    ]
})
export class AppModule {

}