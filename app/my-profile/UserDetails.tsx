"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../_components/AtomicComponents/TextInput";
import { LoggedInUser } from "../../_models/LoggedInUser";
import Button from "../../_components/AtomicComponents/Button";
import { Save } from "lucide-react";
import { UpdateUserDetailsRequest } from "../../_models/user/UpdateUserDetailsRequest";
import { updateUserDetailsSchema } from "../../_constants/ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch } from "@/_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetailsThunk } from "../../_redux/user/userThunk";
import { selectIsLoading } from "../../_redux/user/userSelector";
interface UserDetailsProps {
  loggedInUser: LoggedInUser;
}
interface UpdateUserDetailsRequestExtended extends UpdateUserDetailsRequest {
  confirmPassword?: string;
}
export default function UserDetails(props: UserDetailsProps) {
  const isUpdating = useSelector(selectIsLoading);
  const methods = useForm<UpdateUserDetailsRequestExtended>({
    resolver: yupResolver<UpdateUserDetailsRequestExtended>(
      updateUserDetailsSchema
    ),
  });

  const {
    register,
    formState: { errors },
  } = methods;
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: UpdateUserDetailsRequestExtended) => {
    console.log("Updated profile:", data);
    delete data.confirmPassword;
    dispatch(updateUserDetailsThunk(data));
  };

  useEffect(() => {
    methods.reset({
      email: props.loggedInUser.email,
      name: props.loggedInUser.name,
      userId: "",
    });
  }, [methods, props.loggedInUser]);

  const containerClassname =
    "w-full mx-auto rounded-2xl shadow-md p-6 space-y-6 bg-white:500 space-y-4";

  return (
    <div className={containerClassname}>
      <TextInput
        label="Name"
        type="text"
        {...register("name", { required: "Name is required" })}
        error={errors.name?.message}
      />

      <TextInput
        label="Email"
        type="email"
        {...register("email", { required: "Email is required" })}
        error={errors.email?.message}
      />

      <TextInput
        label="Old Password"
        type="password"
        {...register("oldPassword")}
        error={errors.oldPassword?.message}
      />

      {methods.watch("oldPassword") && (
        <>
          <TextInput
            label="New Password"
            type="password"
            {...register("newPassword")}
            error={errors.newPassword?.message}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </>
      )}
      <Button
        icon={<Save />}
        isLoading={isUpdating}
        label="Save Changes"
        onClick={methods.handleSubmit(onSubmit)}
      />
    </div>
  );
}
