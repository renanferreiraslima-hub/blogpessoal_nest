import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {

    console.log('USANDO DEV - NEON');

    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Postagem, Tema, Usuario],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}