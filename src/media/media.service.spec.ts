import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';

describe('MediaService', () => {
  let service: MediaService;

  beforeEach(() => {
    service = new MediaService();
  });

  it('deve adicionar uma nova mídia ao catálogo', () => {
    const dto: CreateMediaDto = {
      title: 'Matrix Genérica',
      description: 'Um dev descobre que o mundo é uma simulação',
      type: 'movie',
      releaseYear: 2025,
      genre: 'Ficção Científica',
    };

    const result = service.create(dto);

    expect(result).toHaveProperty('id');
    expect(result.title).toBe(dto.title);
    expect(service.findAll()).toHaveLength(1);
  });

  it('deve retornar uma mídia pelo ID', () => {
    const dto: CreateMediaDto = {
      title: 'Interestelar',
      description: 'Exploração espacial e buracos de minhoca',
      type: 'movie',
      releaseYear: 2014,
      genre: 'Ficção Científica',
    };

    const created = service.create(dto);
    const found = service.findOne(created.id);

    expect(found).toEqual(created);
  });

  it('deve lançar erro ao buscar mídia inexistente', () => {
    expect(() => service.findOne('id-invalido')).toThrow();
  });
});