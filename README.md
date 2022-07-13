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

- Pasta utils :

  - Arquivo boxStyles.ts  
    Esse arquivo tem uma função boxTypeStyle que recebe parâmetros, um boolean que definirá se o elemento terá gradiente ou não, receberá um type que um objeto que vai tem uma chave name que receberá uma string, receberá uma altura e largura e alinhamento do texto, de início criamos um objeto que armazenamos em uma variável style que baseados nos parâmetros passados construiremos a nossa estilização para os, tipos de pokemons.

  - Arquivo typeId.ts
    Esse arquivo exportamos um objeto onde temo os nomes dos pokemon como chave e valor como id que utilizaremos na requisição para buscarmos a fraqueza dos pokemons.

  - Arquivo types.ts
    Esse arquivo exportamos um objeto onde temos os nomes dos pokemon como chave o valor são as cores dos tipos no caso de três pokemon que tem duas cores fazemos um array de cores para usarmos na hora de estilizar.

- Pasta components :

  - Button
    Esse componente ele recebe uma propriedade isExplorer essa propriedade ela verificará se tenho que chamar a função de busca de todos pokemons, se não só voltara para página inicial.
  - CardPokemon

  - Footer
    Esse componente é só um componente visual
    não existe neuma logica, só para ter uma identidade visual melhor.

  - Header
    Esse componente é só um componente visual
    não existe neuma logica, só para ter uma identidade visual melhor.
    
  - InfoBox

  - Loading

  - Pagination

  - SearchPokemons

  - Type

- Pasta pages
- arquivo pokemon
  - [id].ts
- index.ts

# Stacks Utilizadas

- React
- Next
- TypeScript
- Axios
- Saas
- React Icons
