import { gql } from "@apollo/client"

export const GET_TRANSACTION = gql`
  query GetTransaction($id: String!) {
    getTransaction(id: $id) {
      id
      description
      amount
      date
      type
      categoryId
      userId
      createdAt
      updatedAt
      category {
        id
        title
        icon
        color
      }
    }
  }
`
