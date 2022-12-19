const parseReposData = (repos: any) => {
  return repos.map((repo: any) => {
    return {
      id: repo.id ?? "",
      name: repo.name ?? "",
      ownerName: repo.owner.login ?? "",
      repoLink: repo.html_url ?? "",
    };
  });
};

export const getRepos = async (query: any, per_page: number, page: number) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=${per_page}&page=${page}`
  );
  const data = await response.json();
  return parseReposData(data?.items);
};
