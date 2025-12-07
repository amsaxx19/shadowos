import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click on 'Log in' to start login process
        frame = context.pages[-1]
        # Click on 'Log in' to start login process
        elem = frame.locator('xpath=html/body/div[2]/nav/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input email amosthiosa1999@gmail.com and click Continue
        frame = context.pages[-1]
        # Input email for login
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div/div/form/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('amosthiosa1999@gmail.com')
        

        frame = context.pages[-1]
        # Click Continue button to proceed to OTP verification
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div/div/form/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Continue' button to proceed to product details form
        frame = context.pages[-1]
        # Click 'Continue' button to proceed to product details form
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Select 'Physical products' as the model for the new product
        frame = context.pages[-1]
        # Select 'Physical products' as the product model
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div/div/div/button[7]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Select 'Ecommerce' as the industry for the new product
        frame = context.pages[-1]
        # Select 'Ecommerce' as the industry
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div/div/div[2]/button[5]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input a business name and click 'Create business' button to proceed
        frame = context.pages[-1]
        # Input business name
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div/div/div[2]/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Test Business')
        

        frame = context.pages[-1]
        # Click 'Create business' button to proceed
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div/div/div[2]/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Create business' button to proceed to next step
        frame = context.pages[-1]
        # Click 'Create business' button to proceed
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        try:
            await expect(frame.locator('text=Product Creation Successful').first).to_be_visible(timeout=1000)
        except AssertionError:
            raise AssertionError("Test case failed: The product creation process did not complete successfully, or the product does not appear on the product list as expected. Uploaded media files may also be missing or inaccessible in Supabase Storage.")
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    