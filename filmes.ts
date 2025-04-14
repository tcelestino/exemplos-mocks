export const Filmes = {
  filmes: {
    nome: 'Filme Exemplo',
    genero: 'Ação',
    ano: 2023,
  },
  carregaFilmes: async () => {
    try {
      const API_URL = 'https://api.example.com/filmes';
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Filmes.filmes),
      });
      const data = await response.json();
      const { nome, genero, ano } = data;
      return { nome, genero, ano };
    } catch (_error) {
      throw new Error('Falha ao carregar os filmes');
    }
  },
};
