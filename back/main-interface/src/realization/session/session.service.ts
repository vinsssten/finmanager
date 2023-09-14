import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../../entities/session';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepo: Repository<Session>,
  ) {}

  getList(userId: number) {
    return this.sessionRepo.findBy({ userId: userId });
  }

  createSession(userId: number, token: string) {
    return this.sessionRepo.insert({ userId, token });
  }

  updateToken(sessionId: number, token: string) {
    return this.sessionRepo.update(
      { id: sessionId },
      { token, updateDate: () => 'CURRENT_TIMESTAMP' },
    );
  }

  delete(id: number) {
    return this.sessionRepo.delete({ id: id });
  }
}
