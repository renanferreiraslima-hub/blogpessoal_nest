import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {

    console.log('USANDO PRODUÇÃO');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}