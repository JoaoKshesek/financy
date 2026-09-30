import { gql } from "@apollo/client"

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
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
