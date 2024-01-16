import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import BookTable from "./BookTable";
import { useSearchParams } from "react-router-dom";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

const StyledOption = styled.option`
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
`;

const StyledLabel = styled.label`
  margin-right: 10px;
`;

function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    searchParams.set(data.searchBy, data.searchTerm);
    setSearchParams(searchParams);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <StyledLabel>Search By:</StyledLabel>
        <Controller
          name="searchBy"
          control={control}
          defaultValue="title" // Default value can be 'title' or 'author'
          render={({ field }) => (
            <select {...field}>
              <StyledOption value="title">Title</StyledOption>
              <StyledOption value="author">Author</StyledOption>
            </select>
          )}
        />
      </div>

      <div>
        <StyledLabel>Search Term:</StyledLabel>
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
