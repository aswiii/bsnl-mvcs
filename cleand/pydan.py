from typing import Optional
from pydantic import BaseModel

class Student(BaseModel):
    name: str
    age: int
    year: str

class UpdateStudent(BaseModel):
    name: Optional[str]=None
    age: Optional[int]= None
    year: Optional[str]= None

class UserSchema(BaseModel): 
    email: str
    password: str

class LogoutToken(BaseModel):
    token:str