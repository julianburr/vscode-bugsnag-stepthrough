import { ExtensionPreview } from "../extension-preview";
import { Inner } from "../inner";
import { ExtensionMock } from "../mock/extension/priorities";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionImage } from "../section-image";

export function PrioritiesSection() {
  return (
    <Section id="priorities" stacked>
      <Inner>
        <SectionContent stacked>
          <h2>Know your priorities</h2>
          <p>
            Choose if you want to see all issues from today, from this week or
            from this month. Then decide what you want to sort by. Step through
            issues in the order you think is most sensible.
          </p>
        </SectionContent>
        <SectionImage>
          <ExtensionPreview content={<ExtensionMock />} height="21rem" />
        </SectionImage>
      </Inner>
    </Section>
  );
}
