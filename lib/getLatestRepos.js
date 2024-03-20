import axios from "axios";

const getLatestRepos = async (data, token) => {
  try {
    const username = data.githubUsername;
    let apiUrl = `https://api.github.com/search/repositories?q=user:${username}&sort=created&order=desc`;

    if (token) {
      apiUrl += `&access_token=${token}`;
    }

    const res = await axios.get(apiUrl);
    let repos = res.data.items;

    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    let latestSixRepos = repos.slice(0, 6);

    return latestSixRepos;
  } catch (err) {
    console.error("Error al obtener repositorios:", err);
    throw err;
  }
};

export default getLatestRepos;
