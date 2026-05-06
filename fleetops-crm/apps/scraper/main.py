import asyncio
import json
import os
from datetime import datetime
from playwright.async_api import async_playwright
from core.login import login_to_portal

async def scrape_source(name: str, url: str, credentials: dict) -> dict:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        result = {
            'source': name,
            'url': url,
            'scraped_at': datetime.now().isoformat(),
            'data': [],
            'error': None
        }
        
        try:
            await login_to_portal(page, url, credentials)
            # Logic for each source would go here or be imported from locadoras/unic modules
            
        except Exception as e:
            result['error'] = str(e)
        
        finally:
            await browser.close()
        
        return result

async def main():
    credentials_raw = os.environ.get('FLEETOPS_CREDS', '{}')
    credentials = json.loads(credentials_raw)
    
    sources = [
        {'name': 'LOCALIZA', 'url': 'https://portal.localiza.com.br'},
        {'name': 'MOVIDA', 'url': 'https://portal.movida.com.br'},
        {'name': 'UNIC', 'url': 'https://portal.unic.com.br'},
    ]
    
    all_results = []
    for source in sources:
        if source['name'] in credentials:
            res = await scrape_source(source['name'], source['url'], credentials[source['name']])
            all_results.append(res)
    
    output_file = 'data/scraped_data.json'
    os.makedirs('data', exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(all_results, f, indent=2)
    
    print(f'Scraping complete. Results saved to {output_file}')

if __name__ == '__main__':
    asyncio.run(main())