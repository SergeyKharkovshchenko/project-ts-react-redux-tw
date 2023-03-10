import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IRepo, IUser, ServerResponse} from '../../models/models'

//setting of API for search
export const githubApi = createApi({
// parameter reducerPath has an address in the store of all our hashed data
  reducerPath: 'github/api',
//we initialize parameter baseQuery using special function
  baseQuery: fetchBaseQuery({
//base url for all this API for later concatination of url's
    baseUrl: 'https://api.github.com/'
  }),
  refetchOnFocus: true,
//required key endpoints is a function that received parameter 'build'
  endpoints: build => ({

    
//it returns object with listing of all necessary endpoints
//we receive data with data types IUser[] (decribed in models), string into query
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10
        }
      }),
// this callback transforms data from response
      transformResponse: (response: ServerResponse<IUser>) => response.items
    }),


    //we receive data with data types IRepo[] (decribed in models), string into query
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`
      })
    }),
    createUser: build.mutation<any, void>({
      query: () => ``
    })
  })
})

// hook useLazyGetUserReposQuery - Lazy means we don't run hook automatically
export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi