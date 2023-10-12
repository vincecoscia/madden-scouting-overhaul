import { useQuery } from 'react-query';

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