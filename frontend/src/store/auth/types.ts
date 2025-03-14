type TLoginFormData = {
    username: string;
    password: string;
  };
  
  type TUser = {
    userId: string;
    email: string;
    firstName: string;
  };
  
  type TLoginResponse = {
    userId: string;
    email: string;
    firstName: string;
    accessToken: string;
  };
  
  export type { TLoginFormData, TUser, TLoginResponse };
  