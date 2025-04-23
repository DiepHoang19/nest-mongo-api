import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {
  validateUser(profile: any): any {
    // Lưu thông tin người dùng vào cơ sở dữ liệu hoặc xử lý theo nhu cầu
    return profile;
  }
}
