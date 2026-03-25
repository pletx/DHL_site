import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MentionsLegales.css";

const MentionsLegales = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="mentions-legales">
      <h1>Mentions légales</h1>
      <p className="mentions-subtitle">
        Conformément aux dispositions des articles 6-III et 19 de la loi
        n°&nbsp;2004-575 du 21&nbsp;juin 2004 pour la Confiance dans l'Économie
        Numérique (LCEN), il est porté à la connaissance des utilisateurs et
        visiteurs du site les présentes mentions légales.
      </p>

      {/* ---- ÉDITEUR ---- */}
      <h2>1. Éditeur du site</h2>
      <p>
        Le présent site est édité par&nbsp;:<br />
        <strong>Section syndicale CGT — DHL Express International</strong>
        <br />
        Organisation syndicale affiliée à la Confédération Générale du Travail
        (CGT), Fédération des Transports.
      </p>
      <ul>
        <li>
          <strong>Responsable de la publication&nbsp;:</strong> Le représentant
          de la section syndicale CGT DHL Express International.
        </li>
        <li>
          <strong>Contact&nbsp;:</strong>{" "}
          <a href="mailto:jujitsu.stephane@live.fr">jujitsu.stephane@live.fr</a>
        </li>
      </ul>

      {/* ---- HÉBERGEUR ---- */}
      <h2>2. Hébergement</h2>
      <p>
        Le site est hébergé par&nbsp;:<br />
        <strong>Render Services, Inc.</strong><br />
        525 Brannan Street, Suite 300, San Francisco, CA 94107, États-Unis<br />
        Site web&nbsp;:{" "}
        <a
          href="https://render.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://render.com
        </a>
      </p>

      {/* ---- PROPRIÉTÉ INTELLECTUELLE ---- */}
      <h2>3. Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (textes, images, graphismes, logos,
        icônes, vidéos, sons, logiciels…) est protégé par les lois françaises et
        internationales relatives à la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication,
        adaptation, totale ou partielle, de l'un quelconque de ces éléments,
        quel que soit le moyen ou le procédé utilisé, est interdite sans
        l'autorisation écrite préalable de l'éditeur, sauf pour un usage
        strictement personnel et privé conformément à l'article L.122-5 du Code
        de la Propriété Intellectuelle.
      </p>
      <p>
        Les marques et logos reproduits sur ce site sont déposés par les sociétés
        qui en sont propriétaires.
      </p>

      {/* ---- RGPD / CONFIDENTIALITÉ ---- */}
      <h2 id="confidentialite">
        4. Protection des données personnelles (RGPD)
      </h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD —
        Règlement UE 2016/679) et à la loi n°&nbsp;78-17 du 6&nbsp;janvier 1978
        modifiée (Loi Informatique et Libertés), les visiteurs disposent d'un
        droit d'accès, de rectification, de suppression, de limitation et de
        portabilité de leurs données personnelles.
      </p>

      <h3>Données collectées</h3>
      <p>Le site peut collecter les données suivantes&nbsp;:</p>
      <ul>
        <li>
          <strong>Formulaire de contact&nbsp;:</strong> nom, prénom, adresse
          e-mail, message. Ces données sont utilisées uniquement pour répondre
          aux demandes des utilisateurs.
        </li>
        <li>
          <strong>Connexion / Authentification&nbsp;:</strong> identifiant et mot
          de passe (stockés de manière sécurisée). Ces données permettent
          l'accès à l'espace réservé aux adhérents.
        </li>
      </ul>

      <h3>Finalité et durée de conservation</h3>
      <p>
        Les données collectées sont traitées dans le cadre de l'intérêt légitime
        de l'organisation syndicale et ne sont en aucun cas cédées ou vendues à
        des tiers. Les données du formulaire de contact sont conservées le temps
        nécessaire au traitement de la demande (maximum 3&nbsp;ans). Les données
        d'authentification sont conservées tant que le compte est actif.
      </p>

      <h3>Exercer vos droits</h3>
      <p>
        Pour exercer vos droits (accès, rectification, suppression…), vous
        pouvez nous contacter à l'adresse&nbsp;:{" "}
        <a href="mailto:jujitsu.stephane@live.fr">jujitsu.stephane@live.fr</a>.
        <br />
        En cas de litige, vous pouvez introduire une réclamation auprès de la{" "}
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          CNIL
        </a>{" "}
        (Commission Nationale de l'Informatique et des Libertés).
      </p>

      {/* ---- COOKIES ---- */}
      <h2 id="cookies">5. Cookies</h2>
      <p>
        Ce site peut utiliser des cookies techniques strictement nécessaires au
        bon fonctionnement du site (authentification, session). Ces cookies ne
        nécessitent pas de consentement préalable conformément à l'article 82 de
        la loi Informatique et Libertés.
      </p>
      <p>
        Le site n'utilise pas de cookies publicitaires, de profilage ou de
        traçage à des fins commerciales. Si des cookies analytiques venaient à
        être utilisés, votre consentement sera recueilli au préalable
        conformément à la réglementation en vigueur.
      </p>
      <p>
        Vous pouvez gérer ou supprimer les cookies via les paramètres de votre
        navigateur.
      </p>

      {/* ---- RESPONSABILITÉ ---- */}
      <h2>6. Limitation de responsabilité</h2>
      <p>
        L'éditeur s'efforce de fournir des informations aussi précises que
        possible sur ce site. Toutefois, il ne pourra être tenu responsable des
        omissions, inexactitudes ou carences dans la mise à jour, qu'elles
        soient de son fait ou du fait de tiers partenaires.
      </p>
      <p>
        L'éditeur ne saurait être tenu responsable des dommages directs ou
        indirects résultant de l'accès ou de l'utilisation du site, y compris
        l'inaccessibilité, les pertes de données, les détériorations, les virus
        pouvant infecter l'équipement informatique de l'utilisateur.
      </p>

      {/* ---- LIENS HYPERTEXTES ---- */}
      <h2>7. Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens hypertextes vers d'autres sites. Ces
        liens sont proposés à titre informatif. L'éditeur n'exerce aucun
        contrôle sur le contenu de ces sites tiers et décline toute
        responsabilité quant à leur contenu ou aux éventuels dommages pouvant
        résulter de leur consultation.
      </p>

      {/* ---- DROIT APPLICABLE ---- */}
      <h2>8. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont soumises au droit français. En cas de
        litige, les tribunaux français seront seuls compétents.
      </p>

      <p style={{ marginTop: 40, fontSize: "0.85rem", color: "#999" }}>
        Dernière mise à jour&nbsp;: {new Date().toLocaleDateString("fr-FR")}
      </p>
    </div>
  );
};

export default MentionsLegales;
