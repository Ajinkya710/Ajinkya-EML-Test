import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <LayoutMain>
        <Navbar />
        <LayoutContent>{children}</LayoutContent>
      </LayoutMain>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LayoutMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const LayoutContent = styled.div`
  flex-grow: 1;
  padding: 26px;
  overflow-y: auto;
`;
