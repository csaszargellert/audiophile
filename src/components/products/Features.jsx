import styled from "styled-components";

const FeaturesEl = styled.section`
  h3 {
    color: var(--black);
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.0857rem;
    text-transform: uppercase;
    margin-bottom: 2.4rem;
  }

  p {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    line-height: 1.66;
  }

  p:not(:last-child) {
    margin-bottom: 2.4rem;
  }

  @media (min-width: 37.5em) {
    h3 {
      font-size: 3.2rem;
      letter-spacing: 0.11rem;
      margin-bottom: 3.2rem;
    }
  }

  @media (min-width: 56.25em) {
    flex-basis: 75%;
  }

  @media (min-width: 68.75em) {
    flex: 0 1 55%;
  }
`;

function Features({ features }) {
  const featuresAsArr = features?.split("\n");
  return (
    <FeaturesEl>
      <h3>features</h3>
      {featuresAsArr.length > 0 ? (
        featuresAsArr.map((feature, index) => {
          return <p key={index}>{feature}</p>;
        })
      ) : (
        <p>No feature has been added.</p>
      )}
    </FeaturesEl>
  );
}

export default Features;
