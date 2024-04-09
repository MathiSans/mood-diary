import styled from "styled-components";

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  z-index: 9999;
`;

export const MenuTriggerContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  padding-block-end: 1.5rem;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const SettingsTriggerContainer = styled.div`
  position: fixed;
  display: flex;
  padding-block-end: 1.5rem;
  padding-inline-end: 1.5rem;
  bottom: 0;
  right: 0;
`;
