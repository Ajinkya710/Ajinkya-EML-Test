import React, { useEffect } from "react";
import { setFormFields } from "./store/slice";
import { userLogIn } from "../../store/auth/action";
import { useAppDispatch } from "../../store";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectError,
  selectIsAuthenticated,
  selectIsLoading,
} from "../../store/auth/selector";
import { setErrorNull } from "../../store/auth/slice";

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectError);
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/toDo");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(userLogIn());
  };

  return (
    <PageWrapper>
      <Container>
        <HeaderContainer>
          <BoldText>Welcome</BoldText>
          <LightText>Please Sign In to continue!</LightText>
        </HeaderContainer>
        <FormContainer onSubmit={handleSubmit}>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            autoComplete="current-username"
            placeholder="Enter your username"
            required
            onChange={(e) => {
              dispatch(setErrorNull());
              dispatch(
                setFormFields({ field: "username", value: e.target.value })
              );
            }}
          />
          <Label>Password</Label>
          <Input
            type={"password"}
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            onChange={(e) => {
              dispatch(setErrorNull());
              dispatch(
                setFormFields({ field: "password", value: e.target.value })
              );
            }}
          />
          {error && <ErrorText>{error}</ErrorText>}
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loading>
                <Spinner />
                <Label>Logging In</Label>
              </Loading>
            ) : (
              "Sign In"
            )}
          </SubmitButton>
        </FormContainer>
      </Container>
    </PageWrapper>
  );
};

export default Login;

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  height: 500px;
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: #000000;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 5px 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
`;

const BoldText = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const LightText = styled.p`
  font-size: 0.9rem;
  color: #ffffff;
`;

const Label = styled.label``;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 0 2rem;
  background-color: #ffffff;
`;

const Input = styled.input`
  height: 42px;
  border: 1px solid rgba(200, 200, 200, 0.3);
  transition: all 200ms ease-in-out;
  outline: none;
  padding: 0 1rem;
  font-size: 1rem;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgba(24, 24, 23, 0.8);
  }
`;

const ErrorText = styled.p`
  color: red;
  margin: 0 auto;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  margin: 0.5rem auto;
  width: 100%;
  max-width: 150px;
  padding: 1rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: #000000;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  &:disabled {
    background: #cccccc;
    color: #666666;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Loading = styled.div`
  display: flex;
  gap: 1em;
  justify-content: space-between;
`;

const Spinner = styled.div`
  border: 2px solid #000000;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
