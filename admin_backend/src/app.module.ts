import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { BlogModule } from './blog/blog.module';
import { UploadModule } from './upload/upload.module';
import { GallaryModule } from './gallary/gallary.module';
import { ContactModule } from './contact/contact.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ServiceRequestsModule } from './service_requests/service_requests.module';
import { StaffModule } from './staff/staff.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleModule } from './role/role.module';
// import { CourseCardModule } from './course-card/course-card.module';
import { SingleCourseModule } from './single-course/single-course.module';
import { QueryModule } from './query/query.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '7983009043Uv@',
      // database: 'freyza_saloon',
      // autoLoadEntities: true,
      // synchronize: true,
    }),
    UsersModule,
    AuthModule,
    UploadModule,
    ServicesModule,
    ServiceCategoryModule,
    HomeModule,
    AboutModule,
    BlogModule,
    GallaryModule,
    ContactModule,
    SubscribersModule,
    AppointmentModule,
    ServiceRequestsModule,
    StaffModule,
    PermissionsModule,
    RoleModule,
    // CourseCardModule,
    SingleCourseModule,
    QueryModule,
    // ServiceCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
