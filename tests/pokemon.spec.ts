import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1234/');
});

test('Searching Pokemon', async ({ page }) => {

    const input = page.getByTestId('input');
    await input.fill("pikachu");
    await input.press('Enter');
    await expect(input).toHaveValue('pikachu');

    const button = page.getByTestId('button');
    await button.click();

    const pokemonName = page.getByTestId('pokemonID')
    await expect(pokemonName).toHaveText('#25');

    const img = page.getByTestId('pokemonImg')

    expect(await img.getAttribute('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png')
});

test('text-based search', async ({ page }) => {

    const input = page.getByTestId('input');
    await input.fill("pik");

    const hitSearchButton = page.getByTestId('hitButton');
    await expect(hitSearchButton).toHaveText('pikachu');

    await hitSearchButton.click()
    const pokemonName = page.getByTestId('pokemonID')
    await expect(pokemonName).toHaveText('#25');

    const img = page.getByTestId('pokemonImg')

    expect(await img.getAttribute('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png')
});



