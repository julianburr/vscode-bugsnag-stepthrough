import { Link as RRLink } from "react-router-dom";
import styled from "styled-components";

export const Link = styled(RRLink)`
  text-decoration: none;

  & svg {
    display: inline-flex;
    height: 1.1em;
    vertical-align: center;
    margin: 0 3px 0 0;
  }
`;
