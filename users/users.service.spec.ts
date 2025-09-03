import { UsersService } from './users.service';
import { MediaService } from '../media/media.service';
import { Media } from '../common/entities/media.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let mediaService: MediaService;

  beforeEach(() => {
    mediaService = new MediaService();
    usersService = new UsersService(mediaService);
  });

  it('deve adicionar uma mídia aos favoritos do usuário', () => {
    const media: Media = mediaService.create({
      title: 'Inception',
      description: 'Sonhos dentro de sonhos',
      type: 'movie',
      releaseYear: 2010,
      genre: 'Sci-Fi',
    });

    usersService.addFavorite('user1', media.id);

    const favorites = usersService.listFavorites('user1');
    expect(favorites).toHaveLength(1);
    expect(favorites[0].title).toBe('Inception');
  });

  it('deve remover uma mídia da lista de favoritos', () => {
    const media = mediaService.create({
      title: 'Batman Begins',
      description: 'O início do Cavaleiro das Trevas',
      type: 'movie',
      releaseYear: 2005,
      genre: 'Ação',
    });

    usersService.addFavorite('user1', media.id);
    usersService.removeFavorite('user1', media.id);

    const favorites = usersService.listFavorites('user1');
    expect(favorites).toHaveLength(0);
  });

  it('deve lançar erro ao tentar favoritar mídia inexistente', () => {
    expect(() => usersService.addFavorite('user1', 'id-fake')).toThrow();
  });
});
