import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home () {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  if (error) return <p>error</p>
  
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>

        <Grid.Row>
          { user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
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
