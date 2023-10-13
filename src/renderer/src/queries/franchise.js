import { useMutation, useQuery, useQueryClient } from 'react-query';

const getAllFranchises = async () => {
  const res = await window.api.ipcRenderer.invoke('get-franchises');
  console.log('getAllFranchises res:', res);
  return res;
}

export const useGetAllFranchises = () => {
  return useQuery('getAllFranchises', getAllFranchises);
}

const getFranchise = async (franchiseId) => {
  const res = await window.api.ipcRenderer.invoke('get-franchise', franchiseId);
  console.log('getFranchise res:', res);
  return res;
}

export const useGetFranchise = (franchiseId) => {
  return useQuery(['getFranchise', franchiseId], () => getFranchise(franchiseId));
}

const createFranchise = async (franchise) => {
  const res = await window.api.ipcRenderer.invoke('create-franchise', franchise);
  console.log('createFranchise res:', res);
  return res;
}

export const useCreateFranchise = () => {
  const queryClient = useQueryClient();
  return useMutation(createFranchise, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllFranchises');
      queryClient.invalidateQueries('getFranchise');
    },
  });
}

const updateFranchise = async (franchise) => {
  const res = await window.api.ipcRenderer.invoke('update-franchise', franchise);
  console.log('updateFranchise res:', res);
  return res;
}

export const useUpdateFranchise = () => {
  const queryClient = useQueryClient();
  return useMutation(updateFranchise, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllFranchises');
      queryClient.invalidateQueries('getFranchise');
    },
  });
}

const deleteFranchise = async (franchiseId) => {
  const res = await window.api.ipcRenderer.invoke('delete-franchise', franchiseId);
  console.log('deleteFranchise res:', res);
  return res;
}

export const useDeleteFranchise = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFranchise, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllFranchises');
      queryClient.invalidateQueries('getFranchise');
    },
  });
}