from pydantic import BaseModel


class OrganisationProfileResponse(BaseModel):
    organisationId: str
    organisation: str
    profile: str
