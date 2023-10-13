import { useMutation, useQuery, useQueryClient } from 'react-query';

const getAllSeasons = async (franchiseId) => {
  const res = await window.api.ipcRenderer.invoke('get-seasons', franchiseId);
  console.log('getAllSeasons res:', res);
  return res;
}

export const useGetAllSeasons = (franchiseId) => {
  return useQuery(['getAllSeasons', franchiseId], () => getAllSeasons(franchiseId));
}


const getSeason = async (seasonId) => {
  const res = await window.api.ipcRenderer.invoke('get-season', seasonId);
  console.log('getSeason res:', res);
  return res;
}

export const useGetSeason = (seasonId) => {
  return useQuery(['getSeason', seasonId], () => getSeason(seasonId));
}

const createSeason = async (season) => {
  const res = await window.api.ipcRenderer.invoke('create-season', season);
  console.log('createSeason res:', res);
  return res;
}

export const useCreateSeason = () => {
  const queryClient = useQueryClient();
  return useMutation(createSeason, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllSeasons');
      queryClient.invalidateQueries('getSeason');
    },
  });
}

const updateSeason = async (season) => {
  const res = await window.api.ipcRenderer.invoke('update-season', season);
  console.log('updateSeason res:', res);
  return res;
}

export const useUpdateSeason = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSeason, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllSeasons');
      queryClient.invalidateQueries('getSeason');
    },
  });
}

const deleteSeason = async (seasonId) => {
  const res = await window.api.ipcRenderer.invoke('delete-season', seasonId);
  console.log('deleteSeason res:', res);
  return res;
}

export const useDeleteSeason = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSeason, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllSeasons');
      queryClient.invalidateQueries('getSeason');
    },
  });
}