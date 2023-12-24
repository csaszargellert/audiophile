import styled from "styled-components";
import { useEffect, useState } from "react";
import { redirect, json, useActionData, useFetcher } from "react-router-dom";

import { axiosPrivate } from "../utils/axios";
import { ButtonOrange } from "../buttons/Button";
import { CHARACTER_COUNT } from "../utils/constants";
import Ratings from "../ratings/Ratings";
import FormError from "../forms/FormError";
import CurveBars from "../spinners/CurveBars";

const CommentContainer = styled.form`
  --padding: 1.2rem;
  background-color: var(--grey);
  padding: 2.4rem 1.6rem;
  border-radius: var(--border-radius);

  h4 {
    color: var(--light-black);
    font-size: 1.8rem;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.025rem;
    text-transform: capitalize;

    margin-bottom: 2.4rem;
  }

  @media (min-width: 37.5em) {
    padding: 3.2rem;
  }
`;

const CommentArea = styled.textarea`
  border: none;
  outline: none;
  background: none;
  resize: none;

  display: block;
  padding: 1.6rem 2.4rem;
  margin-bottom: 1.6rem;
  width: 100%;
  height: 15rem;
  background-color: var(--white);
  border-radius: var(--border-radius);

  color: var(--light-black);

  font-family: "Manrope";
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;

  @media (min-width: 37.5em) {
    height: 10rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const CharacterCount = styled.span`
  color: var(--black);
`;

function AddComment({ productId }) {
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);
  const [charCount, setCharCount] = useState(CHARACTER_COUNT);
  const fetcher = useFetcher();
  const errors = fetcher.data;

  useEffect(() => {
    const commentLength = comment.length;
    setCharCount(250 - commentLength);
  }, [comment]);

  const handleSubmit = function (event) {
    event.preventDefault();
    const formData = new FormData();
    formData.set("comment", comment);
    formData.set("ratings", ratings);
    fetcher.submit(formData, {
      action: `/products/${productId}`,
      method: "POST",
    });
    setComment("");
    setRatings(0);
  };

  console.log(fetcher.state);

  return (
    <CommentContainer onSubmit={handleSubmit}>
      {errors?.length > 0 &&
        errors.map((error, index) => {
          return <FormError key={index}>{error}</FormError>;
        })}
      <h4>Rate Product</h4>
      <Ratings setRatings={setRatings} ratings={ratings} />
      <CommentArea
        name="comment"
        id="comment"
        onChange={(event) => setComment(event.target.value)}
        value={comment}
        placeholder="Type your comment here"
        maxLength={`${CHARACTER_COUNT}`}
      ></CommentArea>
      <ButtonContainer>
        {fetcher.state === "idle" ? (
          <>
            <CharacterCount>{charCount} Characters left</CharacterCount>

            <ButtonOrange type="submit" asEl="button">
              Rate Product
            </ButtonOrange>
          </>
        ) : (
          <div>
            <CurveBars />
          </div>
        )}
      </ButtonContainer>
    </CommentContainer>
  );
}

export default AddComment;

export const action = async function ({ params, request }) {
  const { productId } = params;

  const formData = await request.formData();

  const errors = [];
  if (formData.get("comment").length <= 0) {
    errors.push("Comment cannot be empty");
  }
  if (formData.get("comment").length > 250) {
    errors.push("Comment cannot be greater than 250 characters");
  }
  if (!+formData.get("ratings")) {
    errors.push("Star rating must be provided");
  }
  if (errors.length) {
    return errors;
  }

  try {
    await axiosPrivate({
      method: "POST",
      url: `/products/${productId}/comment`,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
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
