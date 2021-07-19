export const queries = {
  starships: async (_, __, { dataSources }) => {
    const { results } = await dataSources.starshipsAPI.getStarships();
    return results;
  },
};
