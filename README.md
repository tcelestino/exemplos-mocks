# Exemplo de como usar mocks em testes

Este é um exemplo de como usar mocks em testes utilizando o conceito de arquitetura hexagonal.

## Dependências

Para rodar este projeto você precisa ter instalado:

- [Deno](https://deno.com/)

## Como rodar os testes

Você pode verificar os testes em funcionamento olhando o Github Actions: https://github.com/tcelestino/exemplos-mocks/actions

Se preferir rodar localmente, faça o clone desse repositório:

```bash
git clone https://github.com/tcelestino/exemplos-mocks.git
```
Entre na pasta do projeto:

```bash
cd exemplos-mocks
```
Instale o Deno se ainda não o fez. Você pode seguir as instruções de instalação no site oficial do Deno: https://deno.com/

Depois de instalar o Deno, você pode verificar se ele está instalado corretamente executando o seguinte comando:

```bash
deno --version
```
Se tudo estiver correto, você verá a versão do Deno instalada.

Agora, você pode executar os testes do projeto. Primeiro, rode o comando:

```bash
deno install
```
Isso instalará as dependências necessárias para o projeto.

Depois, execute os testes com o seguinte comando:

```bash
deno task test
```
