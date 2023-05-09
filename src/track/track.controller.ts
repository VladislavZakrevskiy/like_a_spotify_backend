import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors, Query } from "@nestjs/common";
import { TrackService } from './track.service';
import { createTrackDto } from "./dto/create_track.dto";
import { createCommentDto } from "./dto/create_comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";




@Controller('/track')
export class TrackController {

    constructor(private trackService: TrackService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
      ]))
    create(@UploadedFiles() files, @Body() dto: createTrackDto) {
        const {picture, audio} = files
        return this.trackService.create(dto, picture[0], audio[0])
    }

    @Get()
    getAll (
        @Query('count') count: number, 
        @Query('offset') offset: number
        ) {
        const tracks = this.trackService.getAll(count, offset)
        return tracks
    }

    @Get('/search')
    search ( @Query('query') query: string, ) {
        const tracks = this.trackService.search(query)
        return tracks
    }

    @Get(':id')
    getOne (@Param('id') id: string) {
        const track = this.trackService.getOne(id)
        return track
    }

    @Delete(':id')
    delete (@Param('id') id: string) {
        const track = this.trackService.delete(id)
        return track
    }

    @Post('/comment')
    addComment (@Body() dto: createCommentDto) {
        return this.trackService.addComment(dto)
    }

    @Post('/listen/:id')
    listen (@Param('id') id: string) {
        return this.trackService.listen(id)
    }
}