import CloudPage from '../pageobjects/cloud.google.com.page.js'
import CalculatorPage from '../pageobjects/calculator.page.js'


// [Hardcore]
// When performing the task, you need to use the capabilities of Selenium WebDriver, the unit testing framework and the Page Object concept. Automate the following script:
// 1. Open https://cloud.google.com/
// 2. By clicking the search button on the portal at the top of the page, enter in the search field "Google Cloud Platform Pricing Calculator"
// 3. Start the search by clicking the search button.
// 4. In the search results, click "Google Cloud Platform Pricing Calculator" and go to the calculator page.

describe('Search for Calculator', () => {
    it('should search and caclucate google prices', async () => {
        await CloudPage.open()
        await CloudPage.doSearch('Google Cloud Platform Pricing Calculator')
        await CloudPage.doClickResult('Google Cloud Platform Pricing Calculator')


    })
})


// 5. Activate the COMPUTE ENGINE section at the top of the page
// 6. Fill in the form with the following data:
//     * Number of instances: 4
//     * What are these instances for ?: leave blank
//     * Operating System / Software: Free: Debian, CentOS, CoreOS
//     * Provisioning model: Spot
//     * Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
//     * Select Add GPUs
//         * Number of GPUs: 1
//         * GPU type: NVIDIA Tesla V100
//     * Local SSD: 2x375 GB
//     * Datacenter location: Frankfurt (europe-west3)
// 7. Click Add to Estimate

describe('Fill data to Calculator page', () => {
    it('try to calculate on calculator page', async () => {
        //await CalculatorPage.open()

        await CalculatorPage.swithToCalculatorFrame()      
        await CalculatorPage.activateTab('Compute Engine')
        await CalculatorPage.fillDataToInputByLabel('Number of instances', 4)
        await CalculatorPage.selectOptionByName('Operating System / Software', 'Free: Debian, CentOS, CoreOS')
        await CalculatorPage.selectOptionByName('Provisioning model', 'Spot')
        await CalculatorPage.selectOptionByName('Machine Family', 'General purpose')
        await CalculatorPage.selectOptionByName('Machine type', 'n1-standard-8')
        await CalculatorPage.selectChecboxByLabel('Add GPUs.')
        await CalculatorPage.selectOptionByName('GPU type', 'Tesla V100')
        await CalculatorPage.selectOptionByName('Number of GPUs', '1')
        await CalculatorPage.selectOptionByName('Local SSD', '2x375 GB')
        await CalculatorPage.selectOptionByName('Datacenter location', 'Frankfurt (europe-west3)')
        await CalculatorPage.clickButtonByText('Add to Estimate')


    })
})


// 8. Select EMAIL ESTIMATE
// 9. In a new tab, open https://10minutemail.com or a similar service for generating temporary emails
// 10. Copy the mailing address generated in 10minutemail
// 11. Return to the calculator, in the Email field enter the address from the previous paragraph
// 12. Press SEND EMAIL
// 13. Wait for the letter with the cost calculation and check that the Total Estimated Monthly Cost in the letter matches what is displayed in the calculator

describe('Send email to Tempmail and compare monthly price in letter vith  value on the calculator`s page ', () => {
    it('try to send email to temporary mail', async () => {

       
        const priceHolder = await $("//div[@class='cpc-cart-total']//b")
        const priceString = await priceHolder.getText()    
        const price = priceString.replace("Total Estimated Cost: ", "").replace("per 1 month", "")
        console.log(price)        

        
        await browser.newWindow('https://www.fakemail.net')  
        const handles = await browser.getWindowHandles()      

        const mailHolder = await $('//span[@id="email"]')
        const myMail = await mailHolder.getText() 

        await browser.switchToWindow(handles[0])
        await CalculatorPage.swithToCalculatorFrame() 

        await CalculatorPage.clickButtonById('Email Estimate')
        await CalculatorPage.fillDataToInputByLabel('Email ', myMail)
        await CalculatorPage.clickButtonByText('Send Email')

        await browser.switchToWindow(handles[1])
        await browser.maximizeWindow()

        let letter = `//td[contains(text(),'Google Cloud Price Estimate')]`
        await $(letter).waitForClickable({ timeout: 60000 })
        await $(letter).click()

        const mainIframe = await $('#iframeMail')     
        await browser.switchToFrame(mainIframe)
   

        const mailedPriceHolder = await $("//h3[contains(text(),'USD')]")
        const mailedPrice = await mailedPriceHolder.getText()     
        
        expect(price).toHaveText(mailedPrice)       

    })
})