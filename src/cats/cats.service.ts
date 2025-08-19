import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { BreedsService } from 'src/breeds/breeds.service';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
    private breedsService: BreedsService
  ) { }

  async create(createCatDto: CreateCatDto) {

    if (createCatDto.breed_id) {
      await this.breedsService.findOne(createCatDto.breed_id);
    }

    const cat = this.catRepository.create(createCatDto);
    const savedCat = await this.catRepository.save(cat);

    return await this.catRepository.findOne({
      where: { id: savedCat.id },
      relations: ['breed'], // ← Esto carga la relación
    });

  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const existingCat = await this.catRepository.findOneBy({ id });
    if (!existingCat) {
      throw new HttpException(`Cat with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return await this.catRepository.update(id, updateCatDto);
  }

  async remove(id: number) {
    const existingCat = await this.catRepository.findOneBy({ id });
    if (!existingCat) {
      throw new HttpException(`Cat with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return await this.catRepository.softDelete(id);
  }
}
