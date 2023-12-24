import styled from "styled-components";
import {
  useRouteLoaderData,
  useFetcher,
  redirect,
  json,
} from "react-router-dom";

import { axiosPrivate } from "../utils/axios";
import { ButtonGoBack } from "../buttons/Button";
import CurveBars from "../spinners/CurveBars";

const StarsContainer = styled.div`
  display: flex;
  align-items: center;

  .icon {
    fill: none;
    stroke: var(--orange);
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const CommentEl = styled.div`
  p {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    line-height: 1.66;

    span {
      color: var(--black);
      font-weight: 700;
      text-transform: capitalize;
      margin-right: 0.8rem;
    }
  }

  div {
    margin-bottom: 0.8rem;
  }

  div:first-of-type {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 56.25em) {
    p:last-child {
      width: 75%;
    }
  }

  @media (min-width: 68.75em) {
    p:last-child {
      width: 62.5%;
    }
  }
`;

const DeleteCommentButton = styled(ButtonGoBack)`
  color: var(--black);

  &:hover {
    color: var(--orange);
  }
`;

const formatDate = function (date) {
  const newDate = new Date(date);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return formatter.format(newDate);
};

function Comment({ children, username, createdAt, ratings, creatorId, id }) {
  const { userIsAuthenticated, userId } = useRouteLoaderData("root");
  const fetcher = useFetcher();

  return (
    <CommentEl>
      <div>
        <p>
          <span>{username}</span> {formatDate(createdAt)}
        </p>
        {userIsAuthenticated && userId === creatorId && (
          <fetcher.Form action={`/comment/${id}`} method="DELETE">
            <DeleteCommentButton asEl="button" type="submit">
              delete
            </DeleteCommentButton>
          </fetcher.Form>
        )}
      </div>
      <StarsContainer>
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <svg
              key={index}
              className="icon icon-star-full"
              style={{
                fill: currentRating <= ratings ? "var(--orange)" : "none",
              }}
            >
              <use xlinkHref="/assets/symbol-defs.svg#icon-star-full"></use>
            </svg>
          );
        })}
      </StarsContainer>
      <p>{children}</p>
    </CommentEl>
  );
}

export default Comment;

export const action = async function ({ params, request }) {
  const answer = window.confirm("Do you want to delete this comment?");
  if (!answer) {
    return null;
  }

  const { commentId } = params;

  try {
    await axiosPrivate({
      url: "/comments/" + commentId,
      method: "DELETE",
    });
    return null;
  } catch (error) {
    if (error.response.status === 401) {
      const params = new URLSearchParams();
      params.set("from", new URL(request.url).pathname);
      return redirect("/login?" + params.toString());
    }

    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }
};
