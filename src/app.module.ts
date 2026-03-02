import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/services/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemConroller } from './postagem/controllers/postagem.controler';  


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true,
    }),
    PostagemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
