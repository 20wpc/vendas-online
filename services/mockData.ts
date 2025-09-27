import { Event } from '../types';

const events: Event[] = [
  {
    id: 1,
    title: 'Festival de Verão Eletrônico',
    date: '2024-08-15',
    displayDate: '15 de Agosto, 2024',
    location: 'Praia do Futuro, Fortaleza',
    price: 250.00,
    imageUrl: 'https://picsum.photos/seed/event1/600/400',
    description: 'O maior festival de música eletrônica do nordeste está de volta! DJs internacionais, 12 horas de música sem parar e uma vibe inesquecível na beira da praia.',
    category: 'Música'
  },
  {
    id: 2,
    title: 'Noite do Rock Clássico',
    date: '2024-09-22',
    displayDate: '22 de Setembro, 2024',
    location: 'Arena Rock, São Paulo',
    price: 180.50,
    imageUrl: 'https://picsum.photos/seed/event2/600/400',
    description: 'Uma noite de nostalgia e guitarras altas com as melhores bandas cover de Led Zeppelin, Queen e AC/DC. Prepare-se para cantar junto todos os hinos do rock!',
    category: 'Música'
  },
  {
    id: 3,
    title: 'Samba & Feijoada no Morro',
    date: '2024-10-05',
    displayDate: '05 de Outubro, 2024',
    location: 'Morro da Urca, Rio de Janeiro',
    price: 300.00,
    imageUrl: 'https://picsum.photos/seed/event3/600/400',
    description: 'Curta o melhor do samba de raiz com uma vista deslumbrante do Rio de Janeiro. Feijoada completa incluída no ingresso. Vagas limitadas!',
    category: 'Música'
  },
  {
    id: 4,
    title: 'Convenção Geek Nation 2024',
    date: '2024-11-12', // Assuming it starts on the 12th
    displayDate: '12-14 de Novembro, 2024',
    location: 'Expo Center Norte, São Paulo',
    price: 450.00,
    imageUrl: 'https://picsum.photos/seed/event4/600/400',
    description: 'O paraíso dos geeks! Painéis com artistas de cinema e HQs, campeonatos de e-sports, cosplays e lançamentos exclusivos. Passaporte para os 3 dias.',
    category: 'Cultura Pop'
  },
  {
    id: 5,
    title: 'Show Acústico: Voz e Violão',
    date: '2024-11-20',
    displayDate: '20 de Novembro, 2024',
    location: 'Teatro Municipal, Curitiba',
    price: 120.00,
    imageUrl: 'https://picsum.photos/seed/event5/600/400',
    description: 'Uma noite íntima e emocionante com os maiores nomes da MPB em formato acústico. Uma experiência musical única e inesquecível.',
    category: 'Música'
  },
  {
    id: 6,
    title: 'Oktoberfest Brasil',
    date: '2024-10-18',
    displayDate: '18 de Outubro, 2024',
    location: 'Parque Vila Germânica, Blumenau',
    price: 90.00,
    imageUrl: 'https://picsum.photos/seed/event6/600/400',
    description: 'A tradicional festa alemã em sua maior edição brasileira. Muita cerveja, música, danças típicas e a alegria contagiante que só a Oktoberfest tem!',
    category: 'Festival'
  },
  {
    id: 7,
    title: 'Festival Gastronômico Sabor & Arte',
    date: '2024-09-15',
    displayDate: '15 de Setembro, 2024',
    location: 'Mercado Municipal, Belo Horizonte',
    price: 75.00,
    imageUrl: 'https://picsum.photos/seed/event7/600/400',
    description: 'Uma celebração dos sabores locais e da alta gastronomia. Chefs renomados, degustações, workshops e música ao vivo. Uma experiência imperdível para os amantes da boa comida.',
    category: 'Comida'
  },
  {
    id: 8,
    title: 'Feira de Vinhos e Queijos',
    date: '2024-11-08',
    displayDate: '08 de Novembro, 2024',
    location: 'Centro de Convenções, Gramado',
    price: 150.00,
    imageUrl: 'https://picsum.photos/seed/event8/600/400',
    description: 'Descubra harmonizações perfeitas na Feira de Vinhos e Queijos. Produtores nacionais e internacionais apresentam seus melhores produtos para degustação e venda.',
    category: 'Comida'
  }
];

export const getEvents = (): Event[] => events;