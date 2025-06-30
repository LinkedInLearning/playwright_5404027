import { Page, Locator } from '@playwright/test';

export class IndexPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto('/tutti-frutti/');
  }

  async clickHome() : Promise<void> {
    await this.page.getByRole('link', { name: 'Tutti-Frutti' }).click();
  }
  
  async clickPortrait() : Promise<void> {
    await this.page.getByRole('link', { name: 'Portrait' }).click();
  }

  async clickTop() : Promise<void> {
    await this.page.getByRole('link', { name: 'Haut de page' }).click();
  }

  async search(query: string) : Promise<void> {
    return await this.searchBox.fill(query);
  }

  get linkChercher() : Locator {
    return this.page.getByRole('link', { name: 'Chercher' });
  }

  get searchBox() : Locator {
    return this.page.getByRole('searchbox', { name: 'Chercher' });
  }

  get fruitCards() : Locator {
    return this.page.getByRole('listitem')
                    .filter({ has: this.page.getByRole('img') })
                    .filter({ hasNotText: 'Autres' })
                    .getByRole('heading', { level: 5 });
  }
}