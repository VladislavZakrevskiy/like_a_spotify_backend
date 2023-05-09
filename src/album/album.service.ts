import { Injectable, UploadedFile } from '@nestjs/common';
import { FileService, fileType } from "src/files/files.service";
import { PrismaService } from "src/prisma.service";
import { CreateAlbumDto } from "./dto/create_album.dto";
import { TrackService } from '../track/track.service';
import { createTrackDto } from "src/track/dto/create_track.dto";




@Injectable()
export class AlbumService {

    constructor(private prisma: PrismaService, private fileService: FileService, private trackService: TrackService) {}

    async getAll () {
        const albums = await this.prisma.album.findMany()
        return albums
    }

    async getOne ( id: string) { // ????
        const album = await this.prisma.album.findUnique({where: {id}, include: {tracks: true}})
        return album 
        
    }

    async seacrh ( query: string) {
        const albums = await this.prisma.album.findMany({where: {name: {contains: query, mode: 'insensitive'}}})
        return albums
    }

    async create(dto: CreateAlbumDto, file) {
        const picturePath = this.fileService.createFile(fileType.IMAGE, file)
        const album = await this.prisma.album.create({data: {...dto, picture: picturePath}})
        return album 
    }

    async addTrack (album_id: string, dto: createTrackDto, files) {
        const {picture, audio} = files
        const track = await this.trackService.create(dto, picture[0], audio[0])
        track.album_id = album_id
        await this.prisma.track.update({data: track, where: {id: track.id}})
        return track
    }

    async deleteAlbum( id: string) {
        const album = this.prisma.album.delete({where: {id}, include: {tracks: true}})
        return album
    }

    async updateAlbum ( dto: CreateAlbumDto, id: string) {
        const album = await this.prisma.album.update({data: dto, where: {id}})
    }

}