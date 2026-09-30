import { gql } from "@apollo/client"

export const GET_CATEGORY = gql`
  query GetCategory($id: String!) {
    getCategory(id: $id) {
      id
      title
      description
      icon
      color
      userId
      createdAt
      updatedAt
    }
  }
`
