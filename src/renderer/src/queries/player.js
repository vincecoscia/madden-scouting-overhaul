import { useMutation, useQuery, useQueryClient } from 'react-query';

const getAllPlayers = async (seasonId) => {
  const res = await window.api.ipcRenderer.invoke('get-players', seasonId);
  console.log('getAllPlayers res:', res);
  return res;
}

export const useGetAllPlayers = (seasonId) => {
  return useQuery(['getAllPlayers', seasonId], () => getAllPlayers(seasonId));
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