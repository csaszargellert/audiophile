import styled from "styled-components";

import Comment from "./Comment";

const CommentsEl = styled.article`
  display: flex;
  flex-direction: column-reverse;
  gap: 3.2rem;
  margin-top: 6.4rem;
`;

const NoRatings = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.6rem;
  margin-top: -2.4rem;

  span {
    display: inline-block;
    color: var(--orange);

    &::first-letter {
      font-size: 2.4rem;
    }
  }
`;

function Comments({ comments }) {
  return (
    <CommentsEl>
      {comments.length ? (
        comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              creatorId={comment.user.id}
              username={comment.user.username}
              createdAt={comment.createdAt}
              ratings={comment.ratings}
            >
              {comment.comment}
            </Comment>
          );
        })
      ) : (
        <NoRatings>
          <span>no</span> ratings yet.
        </NoRatings>
      )}
    </CommentsEl>
  );
}

export default Comments;
