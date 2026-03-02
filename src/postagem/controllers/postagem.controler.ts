import { Controller, Get } from "@nestjs/common";
import { PostagemService } from "../postagem.service";
import { Postagem } from "../entities/postagem.entity";


@Controller("/postagens")
export class PostagemConroller{

    constructor(
        private readonly postagemService: PostagemService
    ){}

    @Get()
    findALL() : Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
}