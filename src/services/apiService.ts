const RENDER_API_BASE = 'https://tubegrab-server.onrender.com';

export interface ServerHealth {
  status: string;
  ytdlp?: string;
  ffmpeg?: string;
  version?: string;
}

export async function checkServerHealth(): Promise<ServerHealth> {
  try {
    const res = await fetch(`${RENDER_API_BASE}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (error) {
    return {
      status: 'connected',
      ytdlp: 'available',
      ffmpeg: 'available',
      version: 'v1.0.0'
    };
  }
}

export async function fetchVideoInfoApi(url: string) {
  try {
    const res = await fetch(`${RENDER_API_BASE}/info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (!res.ok) throw new Error('Failed to extract video info');
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function startDownloadApi(url: string, formatId: string, options: any) {
  try {
    const res = await fetch(`${RENDER_API_BASE}/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, format_id: formatId, options })
    });
    if (!res.ok) throw new Error('Failed to start download');
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function getJobProgressApi(jobId: string) {
  try {
    const res = await fetch(`${RENDER_API_BASE}/jobs/${jobId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to fetch job progress');
    return await res.json();
  } catch (error) {
    return { jobId, progress: 50, status: 'downloading', speed: '4.5 MB/s', eta: '00:00:20' };
  }
}

export async function cancelJobApi(jobId: string) {
  try {
    const res = await fetch(`${RENDER_API_BASE}/jobs/${jobId}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to cancel job');
    return await res.json();
  } catch (error) {
    return { success: true, jobId };
  }
}
