# from models import  Appointment,Child,Parent,Payment,Provider,Record,User,Vaccine
from config import api, app
from routes.appointmentsAPI import appointmentsAPI
from routes.authAPI import Login, Logout
from routes.childrenAPI import ChildrenAPI
from routes.parentsAPI import parentsAPI
from routes.providersAPI import providersAPI
from routes.recordsAPI import recordsApi
from routes.usersAPI import UserAPI
from routes.vaccinesAPI import vaccinesAPI

api.add_resource(UserAPI,'/users',"/users/<int:id>")
api.add_resource(ChildrenAPI,'/children',"/children/<int:id>")
api.add_resource(parentsAPI,"/parents", "/parents/<int:id>")
api.add_resource(providersAPI,"/providers", "/providers/<int:id>")
api.add_resource(appointmentsAPI,"/appointments","/appointments/<int:id>")
api.add_resource(recordsApi,"/records","/records/<int:id>")
api.add_resource(vaccinesAPI,"/vaccines","/vaccines/<int:id>")
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

if __name__ == "__main__":
    app.run(port=5555,debug=True)