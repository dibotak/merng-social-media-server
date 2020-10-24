import React from 'react';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

function PostCard({
  post: { username, body, likeCount, commentCount, createdAt }
}) {

  function likePost() {
    console.log('post liked');
  }

  function commentOnPost() {
    console.log('post commented');
  }

  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
        />
        <Card.Header>{ username }</Card.Header>
        <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
        <Card.Description>
          { body }
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right' onClick={commentOnPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
