import { Inner } from "../inner";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionImage } from "../section-image";
import { Placeholder } from "../placeholder";

export function SkipIssuesSection() {
  return (
    <Section id="skip-issues">
      <Inner>
        <SectionContent>
          <h2>
            Skip issues you can't fix right now and get back to them later
          </h2>
          <p>
            In the flow, but just can't find the fix to this issue. Just skip
            it. This is just locally for you, so you can keep going and always
            come back to the skipped issues later.
          </p>
        </SectionContent>
        <SectionImage>
          <Placeholder />
        </SectionImage>
      </Inner>
    </Section>
  );
}
