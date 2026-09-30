import { gql } from "@apollo/client"

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $id, data: $data) {
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
