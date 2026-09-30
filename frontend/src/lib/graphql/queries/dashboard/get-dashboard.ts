import { gql } from "@apollo/client"

export const GET_DASHBOARD = gql`
  query GetDashboard {
    dashboard {
      balance
      monthIncome
      monthExpenses
      recentTransactions {
        id
        description
        amount
        date
        type
        categoryId
        category {
          id
          title
          icon
          color
        }
      }
      topCategories {
        count
        total
        category {
          id
          title
          icon
          color
        }
      }
    }
  }
`
