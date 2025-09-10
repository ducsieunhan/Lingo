import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: "http://keycloak-server",
  realm: "Lingo",
  clientId: "lingo-ui"
}

const keycloak = new Keycloak(keycloakConfig);

export default keycloak; 