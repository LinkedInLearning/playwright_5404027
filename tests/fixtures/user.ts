import { Browser, Page, TestInfo } from "@playwright/test";
import fs from "fs";

export class User {
    static readonly authorizedUrl = 'https://www.saucedemo.com/inventory.html';
    static readonly loginUrl = 'https://www.saucedemo.com/';
    
    private constructor(readonly username: string, readonly storageState: string, readonly page: Page) 
    { }

    static async login(browser: Browser, info: TestInfo, name: string, pwd: string) : Promise<User> {
        // Fichier unique pour chaque type d'utilisateur et chaque exécution parallèle
        const storageState = `${info.project.outputDir}/.auth/${name}-${info.parallelIndex}.json`;
        
        // Nom de l'utilisateur
        const username = name; // Pour éviter tout conflit : `${name}-${info.parallelIndex}`;

        // Logué si le fichier existe
        const loggedIn = fs.existsSync(storageState);
        
        // Création d'un page pour se loguer ou vérifier l'authentification
        const page = await browser.newPage(loggedIn ? { storageState } : undefined);
        
        if(loggedIn) {
            // Vérification de l'authentification
            await page.goto(User.authorizedUrl); 
            
            // Accès refusé (expiré) ?
            if (page.url() !== User.authorizedUrl) {
                console.log(`User ${username}'s login expired, relogging...`);
                
                // Suppression du fichier obsolète
                fs.unlinkSync(storageState);

                // Reconnexion
                return await User.login(browser, info, username, pwd);
            }
            console.log(`User ${username} already logged in`);
        }
        else {
            // Connexion
            console.log(`User ${username} not logged in`);   
            await page.goto(User.loginUrl);
            await page.getByPlaceholder('Username').fill(name);
            await page.getByPlaceholder('Password').fill(pwd);
            await page.getByRole('button', { name: 'Login' }).click();
            await page.context().storageState({ path: storageState });
        }
        // On crée l'utilisateur (Fixture)
        return new User(username, storageState, page);
    }
    async resetState() {
        await this.page.goto(User.authorizedUrl);
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
        await this.page.getByRole('link', { name: 'Reset App State' }).click();
    }
}