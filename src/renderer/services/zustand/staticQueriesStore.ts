import { DynamicBaseQuery } from '@redux/dynamic_queries';
import create from 'zustand';

interface StaticQueriesState {
  queries: DynamicBaseQuery[];
  createQuery: (str: string) => DynamicBaseQuery;
}

export const useStaticQueriesStore = create<StaticQueriesState>((set) => ({
  queries: [],
  createQuery: (str: string) => {
    const query = new DynamicBaseQuery(str);
    set(({ queries }) => ({ queries: [...queries, query] }));
    return query;
  },
}));
export const createQuery = (str: string) => {
  return useStaticQueriesStore.getState().createQuery(str);
};
