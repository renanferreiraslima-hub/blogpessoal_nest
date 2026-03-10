import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { ILike, Repository, DeleteResult } from "typeorm";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ) {}

    // Buscar todos
    async findAll(): Promise<Tema[]> {
        return this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    // Buscar por ID
    async findById(id: number): Promise<Tema> {

        if (!id || id <= 0)
            throw new HttpException("Id inválido!", HttpStatus.BAD_REQUEST);

        const tema = await this.temaRepository.findOne({
            where: { id },
            relations: {
                postagem: true
            }
        });

        if (!tema)
            throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND);

        return tema;
    }

    // Buscar por descrição (LIKE)
    async findAllByDescricao(descricao: string): Promise<Tema[]> {

        if (!descricao)
            throw new HttpException("Descrição inválida!", HttpStatus.BAD_REQUEST);

        return this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        });
    }

    // Criar
    async create(tema: Tema): Promise<Tema> {

        if (!tema.descricao || tema.descricao.trim() === "")
            throw new HttpException("Descrição é obrigatória!", HttpStatus.BAD_REQUEST);

        return this.temaRepository.save(tema);
    }

    // Atualizar
    async update(tema: Tema): Promise<Tema> {

        if (!tema.id || tema.id <= 0)
            throw new HttpException("Id inválido!", HttpStatus.BAD_REQUEST);

        await this.findById(tema.id);

        return this.temaRepository.save(tema);
    }

    // Deletar
    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return this.temaRepository.delete(id);
    }
}