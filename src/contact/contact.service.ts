import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Contact } from './entity/contact.entity';

@Injectable()
export class ContactService {
  @InjectRepository(Contact)
  private readonly repository: Repository<Contact>;

  async findAll(): Promise<Contact[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Unexpected error while fetching all contacts',
      );
    }
  }

  async findOneOrFail(id: string): Promise<Contact> {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Contact not found.');
    }
  }

  async create(contact: Partial<Contact>): Promise<Contact> {
    try {
      return await this.repository.save(contact);
    } catch (error) {
      throw new BadRequestException('Failed to create contact');
    }
  }

  async update(id: string, payload: Partial<Contact>): Promise<Contact> {
    const contact = await this.findOneOrFail(id);
    return await this.repository.save({
      ...contact,
      ...payload,
    });
  }

  async delete(id: string) {
    return await this.repository.softDelete(id);
  }
}
