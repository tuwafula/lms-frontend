import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;

const StyledLabel = styled.label`
  margin-right: 10px;
`;

function SearchForm({ title }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    searchParams.set("searchTerm", data.searchTerm);
    setSearchParams(searchParams);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <StyledLabel>{title}:</StyledLabel>
        <Controller
          name="searchTerm"
          control={control}
          defaultValue=""
          render={({ field }) => <Input type="text" {...field} />}
        />
      </div>

      <Button size="small" type="submit">
        Search
      </Button>
    </StyledForm>
  );
}

export default SearchForm;
