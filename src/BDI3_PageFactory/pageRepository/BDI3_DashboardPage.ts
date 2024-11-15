import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import path from 'path';

export class BDI3_DashBoardPage {
    private readonly page: Page;
    private readonly context: BrowserContext;
    private readonly CHILD_ADMINISTRATION_MENU_DROPDOWN: Locator;
    private readonly ADD_CHILD_MENU_DROPDOWN_OPTION: Locator;
    private readonly CHILD_FIRST_NAME_INPUTBOX: Locator;
    private readonly CHILD_LAST_NAME_INPUTBOX: Locator;
    private readonly SAVE_BUTTON: Locator;
    private readonly BDI3_TILE: Locator;
    private readonly BDI3_WELCOME_TEXT: Locator;
    private readonly SAVED_SUCCESSFUL_POPUP: Locator;
    private readonly OK_BUTTON: Locator;
    private readonly CHILD_INFORMATION_HEADING: Locator;
    private readonly CONTENT_LOADING_ICON: Locator; //





    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.CHILD_ADMINISTRATION_MENU_DROPDOWN = page.getByLabel('Child Administration');
        this.ADD_CHILD_MENU_DROPDOWN_OPTION = page.getByRole('menuitem', { name: 'Add Child' });
        this.CHILD_FIRST_NAME_INPUTBOX = page.getByPlaceholder('Enter child first name');
        this.CHILD_LAST_NAME_INPUTBOX = page.getByPlaceholder('Enter child last name');
        this.SAVE_BUTTON = page.getByRole('button', { name: 'Save', exact: true });
        this.SAVED_SUCCESSFUL_POPUP = page.getByText('Save successful!OK');
        this.OK_BUTTON = page.getByRole('button', { name: 'OK' });
        this.CHILD_INFORMATION_HEADING = page.getByLabel('Child Information');
        this.CONTENT_LOADING_ICON = page.getByLabel('Content Loading');

    }

    async navigateToAddChildPage() {
        const maxAttempts = 5; // Define the maximum number of attempts
        let attempts = 0;
        let isChildMenuVisible = false;
    
        do {
            // Attempt to click the dropdown
            await this.CHILD_ADMINISTRATION_MENU_DROPDOWN.click();
            attempts++;
    
            // Wait for a short period to allow the dropdown to potentially open
            await this.page.waitForTimeout(500);
    
            // Check if the ADD_CHILD_MENU_DROPDOWN_OPTION is visible
            isChildMenuVisible = await this.ADD_CHILD_MENU_DROPDOWN_OPTION.isVisible();
        } while (!isChildMenuVisible && attempts < maxAttempts);
    
        if (!isChildMenuVisible) {
            throw new Error("Failed to open CHILD_ADMINISTRATION_MENU_DROPDOWN after multiple attempts");
        }
    
        // Now click on the child menu option
        await this.ADD_CHILD_MENU_DROPDOWN_OPTION.click();
        await this.CONTENT_LOADING_ICON.waitFor({ state: 'hidden', timeout: 60000 });
    }
    
}