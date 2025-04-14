import { assertEquals } from '@std/assert';
import { assertSpyCalls, spy, stub } from '@std/testing/mock';
import { Filmes } from './filmes_v1.ts';

Deno.test('Filmes v1', async (t) => {
  await t.step('deve carregar filmes', async () => {
    // Mock para simular a resposta da API
    const mockData = {
      nome: 'Filme de Comédia',
      genero: 'Comédia',
      ano: 2024,
    };

    const originalFetch = globalThis.fetch;
    const mockResponse = new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    globalThis.fetch = stub(
      globalThis,
      'fetch',
      (_input: string | URL | Request, _init?: RequestInit) =>
        Promise.resolve(mockResponse)
    );

    const mockFetchData = spy(Filmes, 'fetchData');

    try {
      // Chamada da função carregaFilmes
      const resultado = await Filmes.carregaFilmes();

      // Verifica se o resultado está correto
      assertEquals(resultado, {
        nome: 'Filme de Comédia',
        genero: 'Comédia',
        ano: 2024,
      });
      // Verifica se o fetchData() foi chamada uma vez
      assertSpyCalls(mockFetchData, 1);
    } finally {
      // Restaura mocks
      mockFetchData.restore();
      globalThis.fetch = originalFetch;
    }
  });

  await t.step('deve lidar com erro ao carregar filmes', async () => {
    // Mock do fetch para simular um erro
    const originalFetch = globalThis.fetch;
    const mockResponseError = new Response(JSON.stringify({}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

    globalThis.fetch = stub(
      globalThis,
      'fetch',
      (_input: string | URL | Request, _init?: RequestInit) =>
        Promise.reject(mockResponseError)
    );

    try {
      // Chamada da função carregaFilmes
      await Filmes.carregaFilmes();
    } catch (error) {
      // Verifica se o erro foi tratado corretamente
      assertEquals((error as Error).message, 'Falha ao carregar os filmes');
    } finally {
      // Restaura o mock
      globalThis.fetch = originalFetch;
    }
  });
});
