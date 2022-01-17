import { ExtensionPreview } from "../extension-preview";
import { Inner } from "../inner";
import { Marker } from "../marker";
import { ExtensionMock } from "../mock/extension/getting-started";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionImage } from "../section-image";

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
              rel="noreferrer noopener"
            >
              Bugsnag auth token
            </a>
            , select the relevant project for your current workspace, and you're
            good to go 😊
          </p>
        </SectionContent>
        <SectionImage>
          <ExtensionPreview
            content={<ExtensionMock />}
            markers={
              <>
                <Marker top="15.2rem" right="-7.2rem" />
                <Marker top="35.2rem" right="11.2rem" />
              </>
            }
            height="39rem"
          />
        </SectionImage>
      </Inner>
    </Section>
  );
}
