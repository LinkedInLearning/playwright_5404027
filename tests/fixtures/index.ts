import { test as base } from '@playwright/test';
import { Nav } from './nav';
import { Console } from 'console';

export const test = base.extend<{
  nav: Nav,
}>({
    nav: async ({ page }, use) => { 
        console.log('Fixture nav : Init');
        const nav = new Nav();

        console.log('Fixture nav : Test');
        await use(nav);

        console.log('Fixture nav : Shut');
    }
});
