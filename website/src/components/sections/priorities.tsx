import styled from "styled-components";
import { Inner } from "../inner";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionImage } from "../section-image";
import { Placeholder } from "../placeholder";

const Image = styled(Placeholder)`
  @media (min-width: 850px) {
    margin-right: 40%;
  }
`;

export function PrioritiesSection() {
  return (
    <Section id="priorities" stacked>
      <Inner>
        <SectionContent stacked>
          <h2>Know your priorities</h2>
          <p>
            Choose if you want to see all issues from today, from this week or
            from this month. Then decide what you want to sort by.
          </p>
        </SectionContent>
        <SectionImage>
          <Image />
        </SectionImage>
      </Inner>
    </Section>
  );
}
