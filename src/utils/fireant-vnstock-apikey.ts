import axios from 'axios';
import puppeteer from 'puppeteer';

export async function getApiKeyFromFireant() {
  const browser = await puppeteer.launch({
    headless: true
  });
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    let apiKey: string | null = null;
    let resolvePromise: (value: string | null) => void;

    const apiKeyPromise = new Promise<string | null>(resolve => {
      resolvePromise = resolve;
    });

    await page.on('request', async request => {
      const url = request.url();
      if (url.includes('restv2.fireant.vn') || url.includes('data')) {
        const headers = request.headers();
        if (headers['authorization']) {
          apiKey = headers['authorization'];
          resolvePromise(apiKey);
        }
      }
      request.continue();
    });

    await page.goto('https://fireant.vn', {
      waitUntil: 'networkidle2'
    });

    const timeoutPromise = new Promise<string | null>(resolve =>
      setTimeout(() => resolve(null), 10000)
    );

    return Promise.race([apiKeyPromise, timeoutPromise]);
  } finally {
    await browser.close();
  }
}

export async function handleResponseFireant(apiKey: string, url: string, params: any) {
  const baseUrl = 'https://restv2.fireant.vn';
  const urlApi = baseUrl + url;
  if (!apiKey) {
    const newApiKey = await getApiKeyFromFireant();
    if (newApiKey) {
      return handleResponseFireant(newApiKey, urlApi, params);
    }
  }
  try {
    const response = await axios.get(urlApi, {
      headers: {
        'Authorization': apiKey,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      params
    });
    if (response.status === 200) {
      const data = response.data;

      return {
        success: true,
        data: data
      };
    }
    return {
      success: false,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      data: error
    };
  }
}