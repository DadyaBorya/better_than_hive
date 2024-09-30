from pydantic import BaseModel


class CreateAVCaseResponse(BaseModel):
    case_id: str
    case_number: int

    def __init__(self, case_id: str, case_number: int):
        super().__init__(case_id=case_id, case_number=case_number)
