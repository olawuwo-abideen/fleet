import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  private nodeEnvironment: string = process.env.NODE_ENV || 'development';

  get(name: string, defaultValue: string = ''): string {
    return process.env[name] || defaultValue;
  }

  get isDevelopment(): boolean {
    return this.nodeEnvironment === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnvironment === 'production';
  }
}
