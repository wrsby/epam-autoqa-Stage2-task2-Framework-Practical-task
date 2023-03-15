import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CloudPage extends Page {
    /**
     * define selectors using getter methods
     */


    /**
     * selector for search form element
     */    
    get searchForm () {
        return $('//devsite-search');
    }

    /**
     * selector for input element
     */        
    get searchFormInput () {
        return $('//devsite-search//input');
    }

    /**
     * a method to search text on page using "devsite-search" page element
     */
    async doSearch(searchText) {
        await this.searchForm.click();
        await this.searchFormInput.setValue(searchText);
        await browser.keys('\uE007')// '\uE007' - 'Enter' key on a keyboard
    }


    /**
     * a method to search text on page using "devsite-search" page element
     */
    async doClickResult(searchResult) {
        let xpathSelector = `//div[contains(@class,"gsc-thumbnail-inside")]//a[contains(@class,"gs-title")]/b[contains(text(),'${searchResult}')]/parent::a`;
        await $(xpathSelector).click();        
    }

    /**
     * a method to switch to iframe with calculator
     */
    async swithToFrame(frameId){
        // switch to iframe
        let frame= browser.$(frameId);      
        browser.pause(1000);
        browser.switchToFrame(frame);
    }


    async activateTab(tabName) {
        browser.switchToFrame('myFrame')
        let xpathSelector = `//md-tab-item//span[contains(text(),'${tabName}')]`;
        let xpathSelector2 = `//span[contains(text(),'Compute Engine') and contains(@class,'ng-binding')]`;
        await $(xpathSelector2).click();  
    }

    /**
     * overwrite open page url method
     */
    open () {
        return super.open('https://cloud.google.com/');
    }
}

export default new CloudPage();
