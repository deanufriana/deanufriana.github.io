export interface GitHubRepoMeta {
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
}

export interface GitHubLanguageShare {
  name: string;
  count: number;
  percent: number;
  color: string;
}

export interface GitHubPortfolioData {
  repos: Record<string, GitHubRepoMeta>;
  latestPush: GitHubRepoMeta | null;
  languages: GitHubLanguageShare[];
  recentRepos: GitHubRepoMeta[];
}

interface RawGitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  languages_url: string;
  pushed_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Vue: "#41b883",
  JavaScript: "#eab308",
  Go: "#00add8",
  Dart: "#00b4ab",
  PHP: "#777bb4",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Astro: "#ff5d01",
  Shell: "#89e051",
  Python: "#3572a5",
  Java: "#b07219",
  Kotlin: "#a97bff",
  Dockerfile: "#384d54",
};

const EMPTY_DATA: GitHubPortfolioData = {
  repos: {},
  latestPush: null,
  languages: [],
  recentRepos: [],
};

const cache = new Map<string, Promise<GitHubPortfolioData>>();

export function fetchGitHubPortfolioData(username = "deanufriana"): Promise<GitHubPortfolioData> {
  const existing = cache.get(username);
  if (existing) return existing;

  const task = loadGitHubData(username);
  cache.set(username, task);
  return task;
}

function toRepoMeta(repo: RawGitHubRepo): GitHubRepoMeta {
  return {
    name: repo.name,
    description: repo.description,
    htmlUrl: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    pushedAt: repo.pushed_at,
  };
}

async function fetchRepoByteCounts(
  repos: RawGitHubRepo[],
  headers: Record<string, string>,
): Promise<Map<string, number>> {
  const byteTotals = new Map<string, number>();
  const targets = repos.slice(0, 10);

  const results = await Promise.allSettled(
    targets.map(async (repo) => {
      const res = await fetch(repo.languages_url, {
        headers,
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      return (await res.json()) as Record<string, number>;
    }),
  );

  for (const result of results) {
    if (result.status !== "fulfilled" || !result.value) continue;
    for (const [lang, bytes] of Object.entries(result.value)) {
      if (typeof bytes === "number" && bytes > 0) {
        byteTotals.set(lang, (byteTotals.get(lang) ?? 0) + bytes);
      }
    }
  }

  return byteTotals;
}

async function loadGitHubData(username: string): Promise<GitHubPortfolioData> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "deanufriana-portfolio",
    };

    const token = typeof process !== "undefined" ? process.env?.GITHUB_TOKEN : undefined;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`,
      {
        headers,
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) return EMPTY_DATA;

    const raw = (await response.json()) as RawGitHubRepo[];
    if (!Array.isArray(raw)) return EMPTY_DATA;

    const ownedRepos = raw.filter((repo) => !repo.fork);
    if (ownedRepos.length === 0) return EMPTY_DATA;

    const repos: Record<string, GitHubRepoMeta> = {};
    const primaryLangCounts = new Map<string, number>();

    for (const repo of ownedRepos) {
      repos[repo.name.toLowerCase()] = toRepoMeta(repo);
      if (repo.language) {
        primaryLangCounts.set(repo.language, (primaryLangCounts.get(repo.language) ?? 0) + 1);
      }
    }

    const latestPush = toRepoMeta(ownedRepos[0]);
    const recentRepos = ownedRepos
      .filter((repo) => repo.name.toLowerCase() !== username.toLowerCase())
      .slice(0, 8)
      .map(toRepoMeta);

    const byteTotals = await fetchRepoByteCounts(ownedRepos, headers);
    const weightSource = byteTotals.size > 0 ? byteTotals : primaryLangCounts;

    const topLangs = Array.from(weightSource.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const total = topLangs.reduce((sum, [, weight]) => sum + weight, 0);
    let remainingPercent = 100;

    const languages: GitHubLanguageShare[] = topLangs.map(([name, count], idx) => {
      const percent =
        idx === topLangs.length - 1
          ? Math.max(1, remainingPercent)
          : Math.max(1, Math.round((count / total) * 100));
      remainingPercent -= percent;

      return {
        name,
        count,
        percent,
        color: LANGUAGE_COLORS[name] ?? "#64748b",
      };
    });

    return {
      repos,
      latestPush,
      languages,
      recentRepos,
    };
  } catch {
    return EMPTY_DATA;
  }
}
