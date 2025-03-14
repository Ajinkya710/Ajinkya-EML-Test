import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { useAppDispatch } from "../../store";

const PrivatePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        // const result = await dispatch(verifyToken());

        // if (!result?.payload) {
        //   navigate("/login", { replace: true });
        // }
      } catch (error) {
        console.error("Token verification failed:", error);
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default PrivatePage;
