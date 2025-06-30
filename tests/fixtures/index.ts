import { test as base } from '@playwright/test';
import { User } from './user';
import { Nav } from './nav';
import { IndexPage } from '../pages/index-page';  

export const test = base.extend<{
  nav: Nav,
  indexPage: IndexPage,
}, {
  stdUser: User,
  pbUser: User,
}>({
    nav: async ({ page }, use) => { 
        console.log('Fixture nav : Init');
        const nav = new Nav();

        console.log('Fixture nav : Test');
        await use(nav);

        console.log('Fixture nav : Shut');
    },
    indexPage: async ({ page }, use) => 
      await use(new IndexPage(page)),
    
    stdUser: [
      async ({ browser }, use) => {
        const user = await User.login(
          browser, test.info(), 
          'standard_user', 'secret_sauce'
        );
        await use(user);
        await user.resetState();
      }, { scope: 'worker' }
    ],
    pbUser: [
      async ({ browser }, use) => {        
        const user = await User.login(
          browser, test.info(), 
          'problem_user', 'secret_sauce'
        ); 
        await use(user);
        await user.resetState();
      }, { scope: 'worker' }
    ],
});
