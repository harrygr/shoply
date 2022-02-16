import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Item = {
  __typename?: 'Item';
  checkedAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ItemInput = {
  checkedAt?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  createItem?: Maybe<Item>;
  deleteItem?: Maybe<Item>;
  updateItem?: Maybe<Item>;
};


export type RootMutationTypeCreateItemArgs = {
  input: ItemInput;
};


export type RootMutationTypeDeleteItemArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeUpdateItemArgs = {
  id: Scalars['ID'];
  input: ItemInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  items: Array<Item>;
  ping?: Maybe<Scalars['String']>;
};

export type CreateItemMutationVariables = Exact<{
  input: ItemInput;
}>;


export type CreateItemMutation = { __typename?: 'RootMutationType', createItem?: { __typename?: 'Item', id: string, name: string, checkedAt?: string | null } | null };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteItemMutation = { __typename?: 'RootMutationType', deleteItem?: { __typename?: 'Item', id: string, name: string, checkedAt?: string | null } | null };

export type ListItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListItemsQuery = { __typename?: 'RootQueryType', items: Array<{ __typename?: 'Item', id: string, name: string, checkedAt?: string | null }> };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'RootMutationType', updateItem?: { __typename?: 'Item', id: string, name: string, checkedAt?: string | null } | null };


export const CreateItemDocument = gql`
    mutation CreateItem($input: ItemInput!) {
  createItem(input: $input) {
    id
    name
    checkedAt
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const DeleteItemDocument = gql`
    mutation DeleteItem($id: ID!) {
  deleteItem(id: $id) {
    id
    name
    checkedAt
  }
}
    `;

export function useDeleteItemMutation() {
  return Urql.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument);
};
export const ListItemsDocument = gql`
    query ListItems {
  items {
    id
    name
    checkedAt
  }
}
    `;

export function useListItemsQuery(options?: Omit<Urql.UseQueryArgs<ListItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<ListItemsQuery>({ query: ListItemsDocument, ...options });
};
export const UpdateItemDocument = gql`
    mutation UpdateItem($id: ID!, $input: ItemInput!) {
  updateItem(id: $id, input: $input) {
    id
    name
    checkedAt
  }
}
    `;

export function useUpdateItemMutation() {
  return Urql.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument);
};