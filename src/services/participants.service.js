import * as participantsAPI from "@/api/participants.api";

export const fetchFromSandbox = async (params) => {
  const organisations = await participantsAPI.fetchFromSandbox(params);

  return cleanResults(organisations);
};

export const fetchFromProduction = async (params) => {
  const organisations = await participantsAPI.fetchFromProduction(params);

  return cleanResults(organisations);
};

export const fetchFromOPINBrasil = async (params) => {
  const organisations = await participantsAPI.fetchFromOPINBrasil(params);

  return cleanResults(organisations);
};

function cleanResults(organisations) {
  const cleanOrganisationData = organisations.map((organisation) => ({
    organisationId: organisation.OrganisationId,
    legalEntityName: organisation.LegalEntityName,
    organisationCnpj: organisation.RegistrationNumber,
    status: organisation.Status,
    address: organisation.AddressLine1 + ", " + organisation.AddressLine2,

    authServers: organisation.AuthorisationServers.map((server) => ({
      authServerName: server.CustomerFriendlyName,
      authServerDescription: server.CustomerFriendlyDescription,
      documentation: server.DeveloperPortalUri,

      apiResources: server.ApiResources.map((resource) => ({
        familyType: resource.ApiFamilyType,
        version: resource.ApiVersion,
        endpoints: resource.ApiDiscoveryEndpoints,
      })),
    })),
    roles: organisation.OrgDomainRoleClaims.map((claim) => ({
      id: claim.RegistrationId,
      role: claim.Role,
      status: claim.Status,
    })),
  }));
  return cleanOrganisationData;
}
