import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AlbumService } from './album.service';
import { CreateAlbumDto } from "./dto/create_album.dto";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { createTrackDto } from "src/track/dto/create_track.dto";




@Controller('/album')
export class AlbumController {

    constructor(private albumService: AlbumService) {}

    @Get()
    getAll () {
        const albums = this.albumService.getAll()
        return albums
    }

    @Get(':id') 
    getOne (@Param('id') id: string) {
        const album = this.albumService.getOne(id)
        return album 
    }

    @Get('/search')
    seacrh (@Query('query') query: string) {
        const albums = this.albumService.seacrh(query)
        return albums
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(@Body() dto: CreateAlbumDto, @UploadedFile() file) {
        const album = this.albumService.create(dto, file)
    }

    @Post('/add/:id') 
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
      ]))
    addTrack (@Param('id') id: string, dto: createTrackDto, @UploadedFiles() files) {
        const track = this.albumService.addTrack(id, dto, files)
        return track
    }

    @Delete(':id') 
    deleteAlbum(@Param('id') id: string) {
        const album = this.albumService.deleteAlbum(id)
        return album
    }

    @Patch(':id') 
    updateAlbum (@Body() dto: CreateAlbumDto, @Param('id') id: string) {
        const album = this.albumService.updateAlbum(dto, id)
        return album
    }


}