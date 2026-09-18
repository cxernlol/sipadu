import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Validate Vercel Cron Secret to ensure the request comes from Vercel
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target') || 'lepkom';

  // Determine workflow based on target
  const workflowId = target === 'baak' ? 'scrape-monthly.yml' : 'scrape-daily.yml';

  // We require a Personal Access Token to trigger a workflow via GitHub API
  if (!process.env.GITHUB_PAT) {
    return NextResponse.json({ 
      error: 'GITHUB_PAT environment variable is missing. Please add it to Vercel.' 
    }, { status: 500 });
  }

  // Attempt to read repo owner/slug from Vercel's automatic env vars, fallback to default if testing locally
  const repoOwner = process.env.VERCEL_GIT_REPO_OWNER || 'cxernlol';
  const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || 'sipadu';

  try {
    const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoSlug}/actions/workflows/${workflowId}/dispatches`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({ ref: 'main' })
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`GitHub API responded with ${res.status}: ${errBody}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Triggered GitHub Action workflow ${workflowId} for target ${target}` 
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
