import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      likes { id username }
      comments { id body username }
      createdAt
      likeCount
      commentCount
    }
  }
`;

function Home () {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (error) return <p>error</p>
  
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>

        <Grid.Row>
          {
            loading
            ?
            (<p>Loading posts...</p>)
            :
            (
              data.getPosts && data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))
            )
          }
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
