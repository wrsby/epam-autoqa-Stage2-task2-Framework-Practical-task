import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CalculatorPage extends Page {
    /**
     * define selectors using getter methods
     */



    /**
     * a method to switch to iframe with calculator
     */
    async swithToCalculatorFrame(){
        const iframe = await $('//iframe')        
        await browser.switchToFrame(iframe)
        
        const iframeNested = await $('//iframe')        
        await browser.switchToFrame(iframeNested)
    }

    /**
     * a method to activate Calculator's tab
     */
    async activateTab(tabName) {        
        let xpathSelector = `//md-tab-item//span[contains(text(),'${tabName}')]`        
        await $(xpathSelector).click()
    }

    /**
     * a method to fill data to input field
     */
    async fillDataToInputByLabel(label, payload) {
        let xpathSelector = `//label[contains(text(),'${label}')]/following-sibling::input`
        await $(xpathSelector).click()
        await $(xpathSelector).setValue(payload)
    }

    /**
     * a method to select Calculator's optoion by name and option's text 
     */
    async selectOptionByName(name, option){
        let xpathSelector = `//md-input-container/label[contains(text(),'${name}')]/following-sibling::md-select`
        await $(xpathSelector).waitForClickable({ timeout: 3000 })
        await $(xpathSelector).click()

        let xpathOptionSelector = `//div[contains(@class,'md-active md-clickable')]//md-option/div[contains(text(),'${option}')]`        
        await $(xpathOptionSelector).waitForExist({ timeout: 5000 });
        await $(xpathOptionSelector).waitForClickable({ timeout: 3000 })
        await $(xpathOptionSelector).click()
    }

    /**
     * a method to select option in selectbox 
     */
    async selectChecboxByLabel(name){
        let xpathSelector = `//form[@name="ComputeEngineForm"]//md-checkbox/div[contains(text(),'${name}')]`
        
        await $(xpathSelector).waitForClickable({ timeout: 3000 })
        await $(xpathSelector).click()

    }

    /**
     * a method to click to buttons by text on it
     */
    async clickButtonByText(text){
        let xpathSelector = `//button[contains(text(),'${text}')]`
        await $(xpathSelector).waitForClickable({ timeout: 3000 })
        await $(xpathSelector).click()
    }


    /**
     * a method to click to buttons by id
     */
    async clickButtonById(id){
        let xpathSelector = `//button[@id='${id}']`
        await $(xpathSelector).waitForClickable({ timeout: 3000 })
        await $(xpathSelector).click()
    }    

    /**
     * overwrite open page url method
     */
    open () {
        return super.open('https://cloud.google.com/products/calculator')
    }
}

export default new CalculatorPage();
