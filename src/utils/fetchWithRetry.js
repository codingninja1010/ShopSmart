/**
 * fetchWithRetry
 * A tiny helper to retry fetches on transient failures with exponential backoff.
 * - Retries only on network errors or 5xx responses.
 * - Respects AbortSignal and throws AbortError when aborted.
 * - Does NOT retry on 4xx responses.
 */

export async function fetchWithRetry(url, options = {}) {
  const {
    retries = 2,
    backoffMs = 300,
    factor = 2,
    signal,
    fetchFn = fetch,
    ...rest
  } = options;

  let attempt = 0;
  let delay = backoffMs;

  const isAbort = (err) => err?.name === 'AbortError';

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  while (true) {
    if (signal?.aborted) {
      // normalize abort behavior
      const err = new DOMException('Aborted', 'AbortError');
      throw err;
    }
    try {
      const res = await fetchFn(url, { signal, ...rest });
      if (!res.ok) {
        // Retry only on 5xx
        if (res.status >= 500 && attempt < retries) {
          await sleep(delay);
          attempt += 1;
          delay *= factor;
          continue;
        }
      }
      return res;
    } catch (err) {
      if (isAbort(err)) throw err;
      // Network error: retry if attempts left
      if (attempt < retries) {
        await sleep(delay);
        attempt += 1;
        delay *= factor;
        continue;
      }
      throw err;
    }
  }
}

export default fetchWithRetry;
