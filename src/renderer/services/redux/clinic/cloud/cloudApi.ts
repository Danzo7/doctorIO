import { ImageFile } from '@models/instance.model';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createQuery } from '@stores/staticQueriesStore';

const cloudApi = createApi({
  reducerPath: 'cloudApi',
  baseQuery: createQuery('clinic/cloud').query,
  tagTypes: ['images'],
  endpoints: (builder) => ({
    getImages: builder.query<string[], void>({
      query: () => '/images',
      providesTags: ['images'],
    }),
    uploadImage: builder.mutation<boolean, ImageFile>({
      query: (body) => {
        return { url: 'upload', body: { ...body }, method: 'POST' };
      },
      invalidatesTags: ['images'],
    }),

    deleteImage: builder.mutation<boolean, number>({
      query: (id) => {
        return {
          url: `images/${id}`,
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
