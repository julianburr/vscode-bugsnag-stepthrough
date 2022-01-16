import styled from "styled-components";
import { VSCodeMock } from "../mock/vscode";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
`;

export function MockSection() {
  return (
    <Container>
      <VSCodeMock />
    </Container>
  );
}
