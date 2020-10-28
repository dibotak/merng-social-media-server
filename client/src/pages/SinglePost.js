import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button, Card, Grid, Icon, Label, Image } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  });

  const onDelete = () => {
    // TODO: remove this page from history
    props.history.push('/');
  }

  let postMarkup;
  if (!data) {
    postMarkup = <p>Loading post...</p>
  } else {
    const {
      id,
      body,
      createdAt,
      likes,
      comments,
      likeCount,
      commentCount,
      username
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated='right'
              size='small'
              src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
            />
          </Grid.Column>
          <Grid.Column width={14}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{ username }</Card.Header>
                <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
                <Card.Description>{ body }</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('comment')}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    { commentCount }
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} onDelete={onDelete} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id body createdAt username likeCount
      likes {
        id
        username
      }
      commentCount
      comments {
        id username createdAt body
      }
    }
  }
`;

export default SinglePost;
