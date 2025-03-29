import { gql } from 'urql'

export const SignupMutation = gql`
  mutation Mutation($input: AuthInput!) {
    signUp(input: $input) {
      token
    }
  }
`
