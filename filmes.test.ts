import { assertEquals } from '@std/assert';
import { assertSpyCalls, stub } from '@std/testing/mock';
import { Filmes } from './filmes.ts'; // Ajuste o caminho conforme necessário

Deno.test('Filmes', async (t) => {
  // Teste para a função carregaFilmes
  await t.step('deve carregar filmes', async () => {
    // Mock do fetch para simular a resposta da API
    const mockData = {
      nome: 'Filme Exemplo',
      genero: 'Ação',
      ano: 2023,
    };

    // @ts-ignore
    const mockFetch = stub(globalThis, 'fetch', () => {
      return Promise.resolve({
        json: () => Promise.resolve(mockData),
      });
    });

    try {
      // Chamada da função carregaFilmes
      const resultado = await Filmes.carregaFilmes();

      // Verifica se o resultado está correto
      assertEquals(resultado, mockData);
      // Verifica se o fetch foi chamado uma vez
      assertSpyCalls(mockFetch, 1);
    } finally {
      // Restaura o stub
      mockFetch.restore();
    }
  });

  // teste para validar o tratamento de erro
  await t.step('deve lidar com erro ao carregar filmes', async () => {
    // Mock do fetch para simular um erro
    const mockFetch = stub(globalThis, 'fetch', () => {
      return Promise.reject(new Error('Erro ao carregar filmes'));
    });

    try {
      // Chamada da função carregaFilmes
      await Filmes.carregaFilmes();
    } catch (error) {
      // Verifica se o erro foi tratado corretamente
      assertEquals((error as Error).message, 'Falha ao carregar os filmes');
    } finally {
      // Restaura o stub
      mockFetch.restore();
    }
  });
});
