import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class TemaService{

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ){}

    async findAll(): Promise<Tema[]>{
        // SELECT * FROM tb_postagens
        return this.temaRepository.find();
    }

    async findById(id:number): Promise<Tema>{
        //SELECT * FROM tb_postagens WHERE id =?;
        const tema = await this.temaRepository.findOne({
            where:{
                id
            }
    })

    if(!tema)
        throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
    
    return tema;
}

async findAllByDescricao(descricao: string): Promise<Tema[]>{
    return this.temaRepository.find({
        where:{
            descricao: ILike(`%${descricao}%`)
        }
    })
}

async create(tema: Tema): Promise<Tema>{
    // INSERT INTO tb_postagens (descricao, texto) VALUES (?, ?);
    return await this.temaRepository.save(tema);

}

async update(tema: Tema): Promise<Tema>{

    if (!tema.id || tema.id <=0)
        throw new HttpException("Id inválido!", HttpStatus.BAD_REQUEST);

    await this.findById(tema.id);

    // UPDATE tb_postagens SET descricao = ?,
    //texto = ?,
    //data = CURRENTE TIMESTAP()
    //WHERE ID = ?

    return await this.temaRepository.save(tema);
}

async delete(id: number): Promise<DeleteResult>{
    await this.findById(id);

    //DELETE tb_postagens FROM id = ?;
    return this.temaRepository.delete(id);

}

}