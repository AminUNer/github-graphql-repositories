import { gql } from 'apollo-angular';

const REPOSITORIES_LIST = gql`
query listRepositories($cursor: String) {
  search(query: "is:public", type: REPOSITORY, first: 12, after: $cursor) {
    repositoryCount
    pageInfo {
      endCursor
    }
    edges {
      node {
        ... on Repository {
          id
          name
          createdAt
          updatedAt
          description
          isArchived
          url
          owner {
            login
            url
            avatarUrl
          }
          defaultBranchRef {
            name
            target {
              ... on Commit {
                id
                history {
                  edges {
                    node {
                      committer {
                        user {
                          name
                          login
                          email
                          url
                          avatarUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export { REPOSITORIES_LIST };
