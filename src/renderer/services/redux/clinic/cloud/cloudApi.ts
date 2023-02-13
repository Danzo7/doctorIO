import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createQuery } from '@stores/staticQueriesStore';

const cloudApi = createApi({
  reducerPath: 'cloudApi',
  baseQuery: createQuery('clinic/cloud').query,
  tagTypes: ['images'],
  endpoints: (builder) => ({
    getImages: builder.query<
      {
        fileName: string;
        id: number;
      }[],
      void
    >({
      query: () => '/images',
      providesTags: ['images'],
    }),
    uploadImage: builder.mutation<boolean, { data: FormData }>({
      query: ({ data }) => {
        return { url: 'upload', body: data, method: 'POST' };
      },
      invalidatesTags: ['images'],
    }),

    deleteImage: builder.mutation<boolean, number>({
      query: (id) => {
        return {
          url: `images/${id}`,
          params: { id },
          method: 'DELETE',
        };
      },
      invalidatesTags: ['images'],
    }),
  }),
});
export default cloudApi;
export const {
  useGetImagesQuery,
  useUploadImageMutation,
  useDeleteImageMutation,
} = cloudApi;
