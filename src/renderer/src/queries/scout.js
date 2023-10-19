import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

const getScout = async (scoutId) => {
  const res = await window.api.ipcRenderer.invoke('get-scout', scoutId)
  console.log('getScout res:', res)
  return res
}

export const useGetScout = (scoutId) => {
  return useQuery(['getScout', scoutId], () => getScout(scoutId))
}

const getScoutsBySeason = async (seasonId) => {
  const res = await window.api.ipcRenderer.invoke('get-scouts-by-season', seasonId)
  console.log('getScoutsBySeason res:', res)
  return res
}

export const useGetScoutsBySeason = (seasonId) => {
  return useQuery(['getScoutsBySeason', seasonId], () => getScoutsBySeason(seasonId))
}

const getScoutsByFranchise = async (franchiseId) => {
  const res = await window.api.ipcRenderer.invoke('get-scouts-by-franchise', franchiseId)
  console.log('getScoutsByFranchise res:', res)
  return res
}

export const useGetScoutsByFranchise = (franchiseId) => {
  return useQuery(['getScoutsByFranchise', franchiseId], () => getScoutsByFranchise(franchiseId))
}

const createScout = async (data) => {
  console.log('createScout data:', data)
  const res = await window.api.ipcRenderer.invoke('create-scout', data)
  console.log('createScout res:', res)
  return res
}

export const useCreateScout = () => {
  const queryClient = useQueryClient()
  return useMutation(createScout, {
    onSuccess: () => {
      queryClient.invalidateQueries('getScout')
      queryClient.invalidateQueries('getScoutsBySeason')
      queryClient.invalidateQueries('getScoutsByFranchise')
    }
  })
}

const updateScout = async (data) => {
  console.log('updateScout data:', data)
  const res = await window.api.ipcRenderer.invoke('update-scout', data)
  console.log('updateScout res:', res)
  return res
}

export const useUpdateScout = () => {
  const queryClient = useQueryClient()
  return useMutation(updateScout, {
    onSuccess: () => {
      queryClient.invalidateQueries('getScout')
      queryClient.invalidateQueries('getScoutsBySeason')
      queryClient.invalidateQueries('getScoutsByFranchise')
    }
  })
}

const deleteScout = async (scoutId) => {
  console.log('deleteScout scoutId:', scoutId)
  const res = await window.api.ipcRenderer.invoke('delete-scout', scoutId)
  console.log('deleteScout res:', res)
  return res
}

export const useDeleteScout = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteScout, {
    onSuccess: () => {
      queryClient.invalidateQueries('getScout')
      queryClient.invalidateQueries('getScoutsBySeason')
      queryClient.invalidateQueries('getScoutsByFranchise')
    }
  })
}

const hireScoutForSeason = async (data) => {
  const { balance, cost } = data

  // if (balance < cost) {
  //   return null;
  // }

  const res = await window.api.ipcRenderer.invoke('hire-scout-for-season', data)
  console.log('hireScoutForSeason res:', res)
  return res
}

export const useHireScoutForSeason = () => {
  const queryClient = useQueryClient()
  return useMutation(hireScoutForSeason, {
    onSuccess: () => {
      queryClient.invalidateQueries('getScout')
      queryClient.invalidateQueries('getScoutsBySeason')
      queryClient.invalidateQueries('getScoutsByFranchise')
      queryClient.invalidateQueries('getSeason')
    },
    onError: (error) => {
      console.log('useHireScoutForSeason error:', error)

      if (error.message.includes('INSUFFICIENT_FUNDS')) {
        toast.error('Insufficient funds')
      } else {
        toast.error('Error hiring scout')
      }
    }
  })
}

const fireScoutFromSeason = async (data) => {
  console.log('fireScoutFromSeason data:', data)
  const res = await window.api.ipcRenderer.invoke('fire-scout-from-season', data)
  console.log('fireScoutFromSeason res:', res)
  return res
}

export const useFireScoutFromSeason = () => {
  const queryClient = useQueryClient()
  return useMutation(fireScoutFromSeason, {
    onSuccess: () => {
      queryClient.invalidateQueries('getScout')
      queryClient.invalidateQueries('getScoutsBySeason')
      queryClient.invalidateQueries('getScoutsByFranchise')
      queryClient.invalidateQueries('getSeason')
    }
  })
}

const generateScouts = async (franchiseId) => {
  console.log('generateScouts franchiseId:', franchiseId)
  const res = await window.api.ipcRenderer.invoke('generate-scouts', franchiseId)
  console.log('generateScouts res:', res)
  return res
}

export const useGenerateScouts = () => {
  const queryClient = useQueryClient()
  return useMutation(generateScouts, {
    onSuccess: () => {
      queryClient.invalidateQueries('getScout')
      queryClient.invalidateQueries('getScoutsBySeason')
      queryClient.invalidateQueries('getScoutsByFranchise')
    }
  })
}
