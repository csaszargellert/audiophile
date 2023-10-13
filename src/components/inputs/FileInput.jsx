import styled from "styled-components";
import { useEffect, useState } from "react";

const File = styled.input.attrs({ type: "file" })`
  display: none;
`;

const Title = styled.span`
  display: inline-block;
  color: ${(props) => (props.$hasError ? "var(--red)" : "rgba(0,0,0,0.4)")};

  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%);

  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.025rem;
`;

const FormInput = styled.div`
  position: relative;

  label {
    background-color: var(--orange);
    color: var(--white);

    display: inline-block;
    padding: 1.2rem 2.4rem;

    font-family: inherit;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.025rem;
    text-transform: capitalize;

    border-radius: var(--border-radius);

    cursor: pointer;
    margin-top: 0.6rem;

    transition: background-color var(--transition-duration)
      var(--transition-timing-function);

    &:hover {
      background-color: var(--light-orange);
    }
  }

  span:not(${Title}) {
    font-size: 1.4rem;
    font-weight: 700;
    display: block;
    margin-left: 0.8rem;
    letter-spacing: -0.025rem;
  }

  p {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-100%);

    font-size: 1.2rem;
    font-weight: 500;

    text-transform: capitalize;
    text-align: right;

    color: var(--red);
    letter-spacing: -0.0214rem;
  }
`;

function FileInput({
  id,
  name,
  children,
  inputState,
  handleInput,
  accept,
  multiple,
  amount,
}) {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileOutput, setFileOutput] = useState(["No file chosen"]);

  useEffect(() => {
    console.log(inputState?.value);
    if (inputState?.value) {
      setIsUploaded(true);
      setCurrentAmount(inputState.value?.length || 1);
    }
  }, [inputState?.value]);

  useEffect(() => {
    if (
      inputState?.value instanceof FileList ||
      inputState?.value instanceof Array
    ) {
      const nameOfFiles = [];
      for (const file of inputState?.value) {
        nameOfFiles.push(file.name);
      }
      setFileOutput(nameOfFiles);
    } else if (inputState?.value instanceof Blob) {
      setFileOutput([inputState?.value?.name]);
    }
  }, [inputState?.value]);

  return (
    <FormInput $hasError={inputState?.hasError}>
      <File
        name={name}
        id={id}
        onChange={handleInput}
        onBlur={handleInput}
        accept={accept}
        multiple={multiple}
      />
      <Title>
        {children} {`${currentAmount}/${amount}`}
      </Title>
      <label htmlFor={id}>upload file</label>
      {fileOutput.map((filename, index) => {
        return <span key={index}>{filename}</span>;
      })}
      {inputState?.isTouched && inputState?.hasError && (
        <p>{inputState?.error}</p>
      )}
    </FormInput>
  );
}

export default FileInput;
