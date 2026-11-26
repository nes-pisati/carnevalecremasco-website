import type { Metadata } from "next";
import { ContactCard, type ContactEntry } from "@/components/ContactCard/ContactCard";
import type { AccentColor } from "@/components/fills";
import { ContactLink } from "@/components/ContactLink/ContactLink";
import { Container } from "@/components/Container/Container";
import { FeaturePanel, StatGrid } from "@/components/FeaturePanel/FeaturePanel";
import type { IconName } from "@/components/Icon/Icon";
import { PageHead } from "@/components/PageHead/PageHead";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { StatBox } from "@/components/Stat/Stat";
import { getSiteSettings } from "@/lib/wp/site";
import type { SiteSettings } from "@/lib/wp/types";
import styles from "./page.module.css";

type TopicContact = {
  id: string;
  icon: IconName;
  color: AccentColor;
  title: string;
  contactPerson: string;
  contacts: ContactEntry[];
};

function topicContacts(site: SiteSettings): TopicContact[] {
  return [
    {
      id: "biglietti",
      icon: "ticket",
      color: "red",
      title: "Biglietti e gruppi",
      contactPerson: "Segreteria del Carnevale",
      contacts: [
        { kind: "phone", value: site.phone },
        { kind: "email", value: site.email },
      ],
    },
    {
      id: "mercatini",
      icon: "store",
      color: "blue",
      title: "Mercatini",
      contactPerson: "Agenzia Cinzia Miraglio",
      contacts: [
        { kind: "phone", value: null },
        { kind: "email", value: null },
      ],
    },
    {
      id: "camperisti",
      icon: "camper",
      color: "sky",
      title: "Raduno camperisti",
      contactPerson: "Camper Club Crema “3C”",
      contacts: [
        { kind: "phone", value: null },
        { kind: "email", value: null },
      ],
    },
    {
      id: "stampa",
      icon: "press",
      color: "pink",
      title: "Ufficio stampa",
      contactPerson: "[Nome del referente]",
      contacts: [{ kind: "email", value: null }],
    },
    {
      id: "partecipa",
      icon: "mask",
      color: "cream",
      title: "Vuoi partecipare al corso mascherato?",
      contactPerson: site.organizationName,
      contacts: [{ kind: "phone", value: site.phone }],
    },
  ];
}

export const metadata: Metadata = {
  title: "Contatti · Carnevale Cremasco",
  description:
    "Telefono, email e indirizzo dell’associazione Carnevale Cremasco ODV e i referenti per biglietti, mercatini, camperisti e stampa.",
};

export default async function ContattiPage() {
  const site = await getSiteSettings();
  const mapsQuery = site.addressLines.join(", ").replaceAll(" · ", ", ");

  return (
    <>
      <PageHead
        title="Contatti"
        lead="Scrivici o chiamaci: qui trovi l’associazione e i referenti giusti per ogni domanda."
      />

      <Container>
        <section aria-labelledby="associazione-title">
          <FeaturePanel
            titleId="associazione-title"
            eyebrow="L’associazione"
            title={site.organizationName}
            aside={
              <StatGrid columns={1}>
                <StatBox>
                  <ul role="list" className={styles.links}>
                    <li>
                      <ContactLink kind="phone" value={site.phone} />
                    </li>
                    <li>
                      <ContactLink kind="email" value={site.email} />
                    </li>
                    <li>
                      <ContactLink kind="address" value={mapsQuery} label="Apri in Google Maps" />
                    </li>
                  </ul>
                </StatBox>
              </StatGrid>
            }
          >
            {site.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <SocialLinks links={site.socialLinks} tone="dark" />
          </FeaturePanel>
        </section>
      </Container>

      <Section end aria-labelledby="argomenti-title">
        <SectionHeader
          titleId="argomenti-title"
          title="Contatti per argomento"
          subtitle="Scegli il referente giusto per la tua domanda"
        />
        <ul role="list" className={styles.grid}>
          {topicContacts(site).map((topic) => (
            <li key={topic.id} className={styles.cell}>
              <ContactCard
                icon={topic.icon}
                color={topic.color}
                title={topic.title}
                contactPerson={topic.contactPerson}
                contacts={topic.contacts}
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
