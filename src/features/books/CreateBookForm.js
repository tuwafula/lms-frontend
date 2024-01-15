import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
import { createBook } from "../../services/apiBooks";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateBookForm() {
  const { register, handleSubmit, reset, getValues, formState, control } =
    useForm();

  const { errors } = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      toast.success("New book created successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const formData = new FormData();

    formData.append("image", data.image[0], data.image[0].name);
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("stock", data.stock);
    formData.append("rent_fee", data.rent_fee);
    formData.append("quantity", data.quantity);

    mutate(formData);
  }

  // function onError(errors) {
  //   console.log(errors);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="title">Book Title</Label>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "This field is required",
          })}
        />
        {errors?.title?.message && <Error>{errors.title.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="author">Book Author</Label>
        <Input
          type="text"
          disabled={isCreating}
          id="author"
          {...register("author", {
            required: "This field is required",
          })}
        />
        {errors?.author?.message && <Error>{errors.author.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="quantity">Book quantity</Label>
        <Input
          type="number"
          disabled={isCreating}
          id="quantity"
          {...register("quantity", {
            required: "This field is required",
          })}
        />
        {errors?.quantity?.message && <Error>{errors.quantity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="stock">Available stock</Label>
        <Input
          type="number"
          disabled={isCreating}
          id="stock"
          {...register("stock", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().quantity ||
              "Available stock should be the same as the book quantity",
          })}
        />
        {errors?.stock?.message && <Error>{errors.stock.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="rent_fee">Rent fee per book</Label>
        <Input
          type="number"
          disabled={isCreating}
          id="rent_fee"
          defaultValue={0}
          {...register("rent_fee", {
            required: "This field is required",
          })}
        />
        {errors?.rent_fee?.message && <Error>{errors.rent_fee.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Book photo</Label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <FileInput
              id="image"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add book</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookForm;
