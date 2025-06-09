"use client";
import Button from "@/_components/AtomicComponents/Button";
import TextInput from "@/_components/AtomicComponents/TextInput";
import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT2,
} from "@/_constants/Fonts";
import { SUCCESS } from "@/_constants/ResponseCodes";
import { registerSchema } from "@/_constants/ValidationSchema";
import { RegisterFormFields } from "@/_models/AuthFormFields";
import { selectAuthData, selectIsLoading } from "@/_redux/auth/authSelector";
import { registerThunk } from "@/_redux/auth/authThunk";
import { setSnackbarMessage } from "@/_redux/snackbar/snackbarActions";
import { AppDispatch } from "@/_redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
export default function RegisterPage() {
  const registerPageClassname = `flex flex-col mt-32 mx-5 md:mx-24 mb-12
                                items-center justify-between space-y-20`;
  return (
    <div className={registerPageClassname}>
      <HeadingText />
      <RegisterForm />
    </div>
  );
}

function HeadingText() {
  const headingTextClassname = `text-center space-y-5`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <FM_Reveal className={headingTextClassname}>
      <>
        <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
          Are you new here?
        </h1>
        <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
          Please register to continue.
        </h6>
      </>
    </FM_Reveal>
  );
}

function RegisterForm() {
  const registerFormClassname = "space-y-5 w-full px-5 md:w-96 md:px-0";
  const methods = useForm<RegisterFormFields>({
    resolver: yupResolver<RegisterFormFields>(registerSchema),
  });
  const { errors } = methods.formState;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoading = useSelector(selectIsLoading);
  const authData = useSelector(selectAuthData);
  const onSubmit = (data: RegisterFormFields) => {
    console.log("Register data submitted:", data);
    dispatch(registerThunk(data));
  };
  useEffect(() => {
    if (authData && authData.statusCode === SUCCESS) {
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: authData.message,
          type: "success",
        })
      );
      router.push("/login");
    } else if (authData && authData.statusCode !== SUCCESS) {
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: authData.message,
          type: "error",
        })
      );
    }
    // return () => {
    //   dispatch(clearAuthData());
    // };
  }, [dispatch, router, authData]);

  return (
    <FormProvider {...methods}>
      <div className={registerFormClassname}>
        <TextInput
          label="Full Name"
          type="text"
          {...methods.register("name", { required: true })}
          error={errors.name?.message}
        />
        <TextInput
          label="Email"
          type="email"
          {...methods.register("email", { required: true })}
          error={errors.email?.message}
        />
        <TextInput
          label="Password"
          type="password"
          {...methods.register("password", { required: true })}
          error={errors.password?.message}
        />

        <Button
          label="Submit"
          isLoading={isLoading}
          onClick={methods.handleSubmit(onSubmit)}
        />
        <p className="text-sm text-center text-gray-600">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Login here
          </a>
        </p>
      </div>
    </FormProvider>
  );
}
