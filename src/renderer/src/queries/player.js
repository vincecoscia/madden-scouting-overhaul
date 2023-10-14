import { useMutation, useQuery, useQueryClient } from 'react-query';

const getAllPlayers = async (seasonId) => {
  const res = await window.api.ipcRenderer.invoke('get-players');
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

const createPlayers = async (players) => {
  const res = await window.api.ipcRenderer.invoke('create-players', players);
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