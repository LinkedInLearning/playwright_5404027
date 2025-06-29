import { test as base } from '@playwright/test';
import { User } from './user';
import { Nav } from './nav';

export const test = base.extend<{
  nav: Nav,
}, {
  adminUser: User,
  normalUser: User,
}>({
    nav: async ({ page }, use) => { 
        console.log('Fixture nav : Init');
        const nav = new Nav();

        console.log('Fixture nav : Test');
        await use(nav);

        console.log('Fixture nav : Shut');
    },
    adminUser: [
      async ({ browser }, use) => {
        const user = await User.login(
          browser, test.info(), 
          'admin', '(mot de passe)'
        );
        await use(user);
        await user.resetState();
      }, { scope: 'worker' }
    ],
    normalUser: [
      async ({ browser }, use) => {        
        const user = await User.login(
          browser, test.info(), 
          'normal', '(mot de passe)'
        ); 
        await use(user);
        await user.resetState();
      }, { scope: 'worker' }
    ],
});
