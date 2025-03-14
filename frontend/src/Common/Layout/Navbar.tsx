import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/auth/slice";
import { selectUser } from "../../store/auth/selector";

const NavBar = () => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container>
      <UserInfo>
        <Avatar>{user?.firstName?.charAt(0).toUpperCase()}</Avatar>
        <AccountDetails>
          <UserName>Welcome! {user?.firstName}</UserName>
          <UserEmail>{user?.email}</UserEmail>
        </AccountDetails>
      </UserInfo>
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin-right: 12px;
`;

const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const UserEmail = styled.span`
  font-size: 14px;
  color: #666;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  min-width: 150px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d9363e;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
  }
`;
