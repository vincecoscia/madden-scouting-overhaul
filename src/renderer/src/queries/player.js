import { useMutation, useQuery, useQueryClient } from 'react-query';

const getAllPlayers = async ({ seasonId, position, sortBy, sortOrder, searchTerm }) => {
  const res = await window.api.ipcRenderer.invoke('get-players', {
    seasonId,
    position,
    sortBy,
    sortOrder,
    searchTerm
  });
  console.log('getAllPlayers res:', res);
  return res;
}

export const useGetAllPlayers = (seasonId, filters) => {
  return useQuery(
    ['getAllPlayers', seasonId, filters],
    () => getAllPlayers({ seasonId, ...filters }),
    {
      keepPreviousData: true, // Keep showing old data while fetching
      staleTime: 30000, // Consider data fresh for 30 seconds
      cacheTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    }
  );
}

const getPlayer = async (playerId) => {
  const res = await window.api.ipcRenderer.invoke('get-player', playerId);
  console.log('getPlayer res:', res);
  return res;
}

export const useGetPlayer = (playerId) => {
  return useQuery(['getPlayer', playerId], () => getPlayer(playerId));
}

const createPlayers = async ({players, seasonId, franchiseId}) => {
  console.log('createPlayers players:', players);
  console.log('createPlayers seasonId:', seasonId);
  const res = await window.api.ipcRenderer.invoke('create-players', { filePath: players, seasonId: seasonId, franchiseId: franchiseId });
  console.log('createPlayers res:', res);
  return res;
}

export const useCreatePlayers = () => {
  const queryClient = useQueryClient();
  return useMutation(createPlayers, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllPlayers');
      queryClient.invalidateQueries('getPlayer');
    },
  });
}