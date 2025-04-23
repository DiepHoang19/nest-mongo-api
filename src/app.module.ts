/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/products/products.module';
import { GoogleAuthModule } from './module/auth/google-auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_mongo'),
    UserModule,
    ProductModule,
    GoogleAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
