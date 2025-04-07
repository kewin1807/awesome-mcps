import puppeteer from 'puppeteer';
import axios from 'axios';

export async function getApiKeyFromCoinAnk() {
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

      if (url.includes('api') || url.includes('data')) {
        const headers = request.headers();
        if (headers['coinank-apikey']) {
          apiKey = headers['coinank-apikey'];
          resolvePromise(apiKey);
        }
      }
      request.continue();
    });

    await page.goto('https://coinank.com/vi/liqHeatMapChart', {
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

export async function handleResponseCoinank(apiKey: string, url: string, params: any) {
  const baseUrl = 'https://api.coinank.com/api';
  const urlApi = baseUrl + url;
  if (!apiKey) {
    const newApiKey = await getApiKeyFromCoinAnk();
    if (newApiKey) {
      return handleResponseCoinank(newApiKey, urlApi, params);
    }
  }
  try {
    const response = await axios.get(urlApi, {
      headers: {
        'coinank-apikey': apiKey,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      params
    });
    console.log('response', response);
    if (response.status === 200) {
      const data = response.data;
      if (data?.success === true) {
        return {
          success: true,
          data: data.data
        };
      }
      if (data?.code === 403) {
        const newApiKey = await getApiKeyFromCoinAnk();
        if (newApiKey) {
          return handleResponseCoinank(newApiKey, urlApi, params);
        }
      }
      else {
        return {
          success: false,
          data
        };
      }
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