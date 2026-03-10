import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemConroller } from "./controllers/postagem.controler";
import { TemaModule } from "../tema/tema.modules";


@Module({
    imports:[TypeOrmModule.forFeature([Postagem]), TemaModule],
    controllers: [PostagemConroller],
    providers: [PostagemService],
    exports: []
})

export class PostagemModule{}