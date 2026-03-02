import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../postagem.service";
import { PostagemConroller } from "../controllers/postagem.controler";


@Module({
    imports:[TypeOrmModule.forFeature([Postagem])],
    controllers: [PostagemConroller],
    providers: [PostagemService],
    exports: []
})

export class PostagemModule{}