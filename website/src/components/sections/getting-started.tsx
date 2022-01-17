import { Inner } from "../inner";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionImage } from "../section-image";
import { Placeholder } from "../placeholder";

export function GettingStartedSection() {
  return (
    <Section id="#getting-started">
      <Inner>
        <SectionContent>
          <h2>Get up and running in a minute</h2>
          <p>
            Install the plugin, add your{" "}
            <a
              href="https://app.bugsnag.com/settings/my-account"
              target="_blank"
              rel="noreferrer nofollow"
            >
              Bugsnag auth token
            </a>
            , select the relevant project for your current workspace, and you're
            good to go 😊
          </p>
        </SectionContent>
        <SectionImage>
          <Placeholder />
        </SectionImage>
      </Inner>
    </Section>
  );
}
