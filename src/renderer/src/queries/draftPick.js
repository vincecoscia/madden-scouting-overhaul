import { useMutation, useQuery, useQueryClient } from 'react-query';

const getDraftPick = async (draftPickId) => {
  const res = await window.api.ipcRenderer.invoke('get-draft-pick', draftPickId);
  console.log('getDraftPick res:', res);
  return res;
}

export const useGetDraftPick = (draftPickId) => {
  return useQuery(['getDraftPick', draftPickId], () => getDraftPick(draftPickId));
}

const getDraftPicksBySeason = async (seasonId) => {
  const res = await window.api.ipcRenderer.invoke('get-draft-picks-by-season', seasonId);
  console.log('getDraftPicksBySeason res:', res);
  return res;
}

export const useGetDraftPicksBySeason = (seasonId) => {
  return useQuery(['getDraftPicksBySeason', seasonId], () => getDraftPicksBySeason(seasonId));
}

const refreshDraftPicks = async ({ seasonId, filePath }) => {
  const res = await window.api.ipcRenderer.invoke('refresh-draft-picks', { seasonId: seasonId, filePath: filePath });
  console.log('refreshDraftPicks res:', res);
  return res;
}

export const useRefreshDraftPicks = () => {
  const queryClient = useQueryClient();
  return useMutation(refreshDraftPicks, {
    onSuccess: () => {
      queryClient.invalidateQueries('getDraftPicksBySeason');
      queryClient.invalidateQueries('getDraftPick');
    },
  });
}