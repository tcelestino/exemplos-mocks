export const Filmes = {
  filmes: {
    nome: 'Filme Exemplo',
    genero: 'Ação',
    ano: 2023,
  },

  fetchData: async () => {
    try {
      const response = await fetch('https://api.example.com/filmes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Filmes.filmes),
      });

      return await response.json();
    } catch (error) {
      throw new Error('Falha ao carregar os filmes', {
        cause: error,
      });
    }
  },

  carregaFilmes: async () => {
    const filmes = await Filmes.fetchData();
    return filmes;
  },
};
