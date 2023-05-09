import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createTrackDto } from './dto/create_track.dto';
import { createCommentDto } from './dto/create_comment.dto';
import { FileService, fileType } from '../files/files.service';


@Injectable()
export class TrackService {
    
    constructor(private prisma: PrismaService, private fileService: FileService) {}

    async create (dto: createTrackDto, picture, audio) {
        const audioPath = this.fileService.createFile(fileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(fileType.IMAGE, picture)
        const track = await this.prisma.track.create({data: {
            ...dto, listens: 0, audio: audioPath, picture: picturePath
        }})
        return track
    }

    async getAll (count: number = 10, offset: number = 0) {
        const tracks = await this.prisma.track.findMany({skip: +offset, take: +count})
        return tracks
    }

    async search (query: string) {
        const tracks = await this.prisma.track.findMany({where: {name: {equals: query, mode: 'insensitive'}}})
        return tracks
    }

    async getOne (id: string) {
        const track = await this.prisma.track.findUnique({where: {id}})
        const comments = await this.prisma.comments.findMany({where: {track_id: id}})
        return {...track, comments}
    }

    async delete (id: string) {
        const track = await this.prisma.track.delete({where: {id}})
        return track.id
    }

    async addComment (dto: createCommentDto) {
        const comment = await this.prisma.comments.create({data: {...dto}})
        return comment
    }

    async listen(id: string) {
        const track = await this.prisma.track.findUnique({where: {id}})
        track.listens += 1
        return this.prisma.track.update({data: {...track}, where: {id}})   
    }

}