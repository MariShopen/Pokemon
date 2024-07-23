# Pokemon

- Deployed version -> https://pokemonsearch-mari-ss-projects.vercel.app/

## Development

1. Install dependencies with `yarn`
2. Run `yarn dev`

## Tech stack

- React is used for building the UI and interactivity.
- Tailwind CSS and shadcn/ui is used for styling.
- The project uses Prettier and ESLint to ensure a consistent code style and quality.
- The code is written in TypeScript to provide type safety and increase reliability.
- Fuse.js is use for text-based search feature
- Playwright use for e2e tests 
- Deployed with Vercel

## Things which are implemented

- User can enter a Pokémon name and search some information about it
- When submitting, query https://pokeapi.co and display the given Pokémon name, id, weight, height and sprite and an error message if no match is found
- “Previous” & “Next” buttons, that switch to the previous/next Pokémon, based on their id number
- Text-based search feature implemented via buttons under the search input, using fuse.js
- Two automated tests, for the submit feature and text-based search feature, using Playwright

## Things which are not implemented
- Not build a caching mechanism to prevent making a request to https://pokeapi.co each time we search for a Pokémon due to lack of time. If I had more time, I would use pokeapi-js-wrapper for Browser-side with auto caching or localStorage.

