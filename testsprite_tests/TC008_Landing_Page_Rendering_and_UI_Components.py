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
        # -> Test the search bar live suggestions by typing a query to verify suggestions appear.
        frame = context.pages[-1]
        # Type 'test' in the search bar to check live suggestions
        elem = frame.locator('xpath=html/body/div[2]/div/div[2]/div[2]/div/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('test')
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=⚡').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Log in').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mulai Jualan').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Trends').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Lihat Tren').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Belajar Saham').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tips Affiliate').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cara FYP TikTok').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ide Bisnis 2025').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tutorial Coding').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Diet Sehat').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Investasi Pemula').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=⚡').nth(1)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CUANBOSS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=The operating system for digital entrepreneurs').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=⌘K').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Clipping').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Trading').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Bisnis').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Karir').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Teknologi').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Lifestyle').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    