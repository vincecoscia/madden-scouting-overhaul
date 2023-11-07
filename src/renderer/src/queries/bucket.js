import { useMutation, useQuery, useQueryClient } from 'react-query';
import buckets from '../assets/json/buckets.json';

const getRelevantStats = (position) => {
  // Map special positions to the general position category

  // console.log(position);
  const positionMap = {
    'RT': 'OL', 'LT': 'OL', 'C': 'OL', 'RG': 'OL', 'LG': 'OL',
    'RE': 'DL', 'LE': 'DL', 'DT': 'DL',
    'MLB': 'LB', 'ROLB': 'LB', 'LOLB': 'LB',
    'FS': 'S', 'SS': 'S',
    'K': 'K', 'P': 'K'
  };

  // Find the general position category if there's a special mapping, or use the position as is
  const generalPosition = positionMap[position] || position;

  // Find the relevant stats for the general position category
  const relevantStatsBucket = buckets.find(bucket => bucket.position === generalPosition);

  // If found, return the relevant stats, otherwise return an empty array
  return relevantStatsBucket ? relevantStatsBucket.relevantStats : [];
};

export const useGetRelevantStats = (position) => {
  return useQuery(['getRelevantStats', position], () => getRelevantStats(position));
};

const getAllRelevantStats = (players) => {
  const allRelevantStats = players.reduce((acc, player) => {
    const relevantStats = getRelevantStats(player.position);
    return [...acc, ...relevantStats];
  }, []);

  return [...new Set(allRelevantStats)];
};

export const useGetAllRelevantStats = (players) => {
  return useQuery(['getAllRelevantStats', players], () => getAllRelevantStats(players));
};