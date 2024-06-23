from models.Appointment import Appointment
from models.Child import Child
from models.Parent import Parent
from models.Payment import Payment
from models.Provider import Provider
from models.Record import Record
from models.User import User
from models.Vaccine import Vaccine
from config import app,db


if __name__ == "main":
    # db.create_all()
    app.run(port=5555,debug=True)