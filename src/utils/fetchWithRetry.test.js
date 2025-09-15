import { fetchWithRetry } from './fetchWithRetry';

const mockResponse = (status = 200, body = { ok: true }) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});

describe('fetchWithRetry', () => {
	it('returns on success without retry', async () => {
		const fetchFn = jest.fn().mockResolvedValueOnce(mockResponse(200, { a: 1 }));
		const res = await fetchWithRetry('https://example.com', { fetchFn });
		expect(res.ok).toBe(true);
		expect(fetchFn).toHaveBeenCalledTimes(1);
	});

	it('retries on 5xx and eventually succeeds', async () => {
		const fetchFn = jest
			.fn()
			.mockResolvedValueOnce(mockResponse(500))
			.mockResolvedValueOnce(mockResponse(502))
			.mockResolvedValueOnce(mockResponse(200, { ok: true }));
		const res = await fetchWithRetry('https://example.com', {
			fetchFn,
			retries: 2,
			backoffMs: 1,
		});
		expect(res.ok).toBe(true);
		expect(fetchFn).toHaveBeenCalledTimes(3);
	});

	it('does not retry on 4xx', async () => {
		const fetchFn = jest.fn().mockResolvedValueOnce(mockResponse(404));
		const res = await fetchWithRetry('https://example.com', { fetchFn, retries: 3 });
		expect(fetchFn).toHaveBeenCalledTimes(1);
		expect(res.status).toBe(404);
	});

	it('retries on network error then succeeds', async () => {
		const networkErr = new Error('network');
		const fetchFn = jest
			.fn()
			.mockRejectedValueOnce(networkErr)
			.mockResolvedValueOnce(mockResponse(200));
		const res = await fetchWithRetry('https://example.com', { fetchFn, retries: 1, backoffMs: 1 });
		expect(res.ok).toBe(true);
		expect(fetchFn).toHaveBeenCalledTimes(2);
	});

	it('respects AbortSignal and throws AbortError', async () => {
		const controller = new AbortController();
		const fetchFn = jest.fn(() => {
			controller.abort();
			const err = new DOMException('Aborted', 'AbortError');
			return Promise.reject(err);
		});
		await expect(
			fetchWithRetry('https://example.com', { fetchFn, signal: controller.signal })
		).rejects.toHaveProperty('name', 'AbortError');
		expect(fetchFn).toHaveBeenCalledTimes(1);
	});
});


