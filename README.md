## Sobre a Pokedex

Primiero , realizar um `git clone https://github.com/Cr-collab/Pokedex.git`

Segundo `cd Pokedex `

Terceiro, rode o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu Navegador e veja o resultado.

# Funcionalidades

- Pasta service >

  - na pasta service temos arquivo api.ts com a configuração do axios
    além de funções que pegam as informações dos pokemons e retornam os dados.
    Temos Três funções :
    - getPokemons:
      Ela recebe o parâmetro da página atual, que se inicia em zero.
      Realizamos a requisição baseada nisso,
      pegamos o data dessa requisição
      que retorna results onde temos um array
      com name do pokemon e a url para termos
      mais informações, percorremos esse result
      fazendo requisição para url e pegando a imagem, os tipos, e o id do pokemon, tem pokemons que não têm imagem,
      por isso verificamos se tem a imagem,
      para setarmos uma imagem padrão que esta em public/assests/poke.png, ao final de cada requisição do array adicionamos em novo array com informações que queremos,
      ao final disso devolvemos um objeto com array de pokemos a quantidade de pokemon e proxima pagina e pagina anterior, para montagem do card dos pokemons e da paginação.
      
  - getPokemon:
    Ela recebe um parâmetro que pode ser o id do pokemon ou o nome dele nesse caso estamos buscando um único pokemon.
    Realizamos a requisição baseada no nome e id,
    pegando a imagem, os tipos, e o id do pokemon, tem pokemon que não têm imagem,
    por isso verificamos se tem a imagem,
    para setarmos uma imagem padrão em public/assests/poke.png e ao finalizar setamos isso no array e enviamos com return um objeto onde temos esse array e outras informações.

  - informationPokemonAll:
    Essa requisição recebe o id do pokemon para realizarmos uma busca com todas as inconformação do pokemon, efetuamos uma requisição onde pegamos o nosso pokemon
    que tem o nome, tipo, id, altura, peso, realizamos outa requisição para pegar a decription fazemos uma tratativa por que alguns pokemons não tem descrição.
    Fazemos uma requisição para pegar as fraquezas do pokemon para cada tipo tem um id, criei um arquivo a parte com um
    objeto onde a chave é nome e o valor id
    para conseguirmos concretizar a requisição.

# Stacks Utilizadas

- React
- Next
- TypeScript
- Axios
- Saas
- React Icons
