import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/toDo/toDo.module';

@Module({
  imports: [UserModule, TodoModule],
})
export class AppModule {}
