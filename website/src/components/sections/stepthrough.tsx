import { Inner } from "../inner";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionImage } from "../section-image";
import { Placeholder } from "./placeholder";

export function StepthroughSection() {
  return (
    <Section id="stepthrough" reverse>
      <Inner>
        <SectionContent>
          <h2>Simple stepthrough functionality</h2>
          <p>
            Easily go through all your open issues one by, directly in your IDE,
            and see all the info that might help you fix the issue.
          </p>
        </SectionContent>
        <SectionImage>
          <Placeholder />
        </SectionImage>
      </Inner>
    </Section>
  );
}
