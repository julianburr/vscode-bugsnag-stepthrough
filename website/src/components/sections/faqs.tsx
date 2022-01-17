import styled from "styled-components";

import { event } from "src/utils/ga";
import { Inner } from "../inner";
import { Section } from "../section";
import { SectionContent } from "../section-content";

import ConversationSvg from "src/assets/illustrations/conversation.svg";

const Svg = styled(ConversationSvg)`
  position: absolute;
  top: 2rem;
  right: calc(50% + 8rem);
  height: 40rem;
  width: auto;
  display: none;

  @media (min-width: 850px) {
    display: block;
  }
`;

export function FaqsSection() {
  return (
    <Section id="#faqs" reverse>
      <Inner>
        <Svg role="presentation" />

        <SectionContent>
          <h2>FAQs</h2>

          <h3>Is this an official plugin made by Bugsnag?</h3>
          <p>
            <a
              href="#unofficial"
              onClick={() => event({ action: "no_clicked" })}
            >
              No!
            </a>
          </p>

          <h3>Why?</h3>
          <p>
            Because I used to work a lot with Bugsnag and always found it
            tedious to integrate it into my daily workflows. So I thought it
            would be neat to have an IDE plugin that would allow you to step
            through all of the open errors easily. I had a weekend without
            anything to do, so: here we are 😅
          </p>

          <h3>Where do I find that Bugsnag token I need to add?</h3>
          <p>
            Assuming you have a bugsnag account, you can create a "personal auth
            token" in your{" "}
            <a
              href="https://app.bugsnag.com/settings/my-account"
              target="_blank"
              rel="noreferrer noopener"
            >
              account settings
            </a>
            .
          </p>
          <p>
            If you dont have a Bugsnag account, you can find help{" "}
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>
            .
          </p>

          <h3>How can I use this plugin in a monorepo?</h3>
          <p>
            Have a workspace for each of the individual projects in your
            monorepo. That might make more sense anyway, since different
            projects will likely be related to different Bugsnag projects.
          </p>
          <p>
            But even if you don't, you can still use the plugin (connecting to
            multiple Bugsnag projects) with no problem, the only thing that
            won't work is opening files since the file paths are likely not
            relative to the workspace root 🤷‍♂️
          </p>

          <h3>
            Can I use this plugin with anything other than Bugsnag? What about
            Sentry?
          </h3>
          <p>
            Theoretically it should be fairly straight forward to add more bug
            tracking providers. Hit me up if there is any interest in any
            specific ones 😊
          </p>
        </SectionContent>
      </Inner>
    </Section>
  );
}
